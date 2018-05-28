var connection = require('./../connection');
var moment = require('moment');
const tools = require('./../helpers/tools');
const DEFAULT_LANG = require('./../constants').DEFAULT_LANG;
const LANG = require('./../constants').LANG;
const async = require('async');
const mysql = require('mysql');
var _ = require('lodash');


/*
 var client = require('./../redisClient');
 client.on('connect', function () {
 console.log('connected');
 });*/

// --- retrieve data by url lng
const retrieveDataByCollection = function fct(req, res) {
  var finalData = {};
  // 1 -- retrieve lng
  var lang = req.params.lng;
  const idCollection = req.params.idCollection;
  // 2 -- check if params exists.
  if (!lang || !tools.arrayContains(LANG, lang)) {
    lang = DEFAULT_LANG;
  }
  if (!idCollection) {
    return res.status(500).json('idCollection MANQUANTE');
  }

  // --- 3 retrieve product By URL
  finalData = {
    'univers': 'shop',
    'lang': lang
  };
  async.series([

    // content
    function fct1(callback1) {
      const sqlSelect = tools.queryCollectionShopById('collection', lang, idCollection);
      connection.query(sqlSelect,
        function fctSeo(error, homeSelection) {
          if (error) {
            console.log(error);
            // return res.status(500).json(error);
          }
          finalData['collection'] = (typeof homeSelection !== 'undefined' && typeof homeSelection[0] !== 'undefined') ? homeSelection[0] : {};
          callback1();
        });
    },
    // media
    function (callback1) {
      if (typeof finalData['collection'] !== 'undefined' && typeof finalData['collection'].id !== 'undefined') {
        var sqlGetChildren = tools.queryAllMedia('collection', lang, finalData['collection'].id);
        tools.executeAsynGetMedia(connection, sqlGetChildren, finalData['collection'], function (data) {
          callback1();
        });
      } else {
        callback1();
      }
    },
    //
    //   product de la même collection
    function (callback1) {
      if (typeof finalData['collection'] !== 'undefined' && typeof  finalData['collection'].id !== 'undefined') {
        const sqlOther = tools.querySelectionSameCollection('product', lang, finalData['collection'].id);
        connection.query(sqlOther,
          function (error, dataOthers) {
            if (error || dataOthers.length === 0) {
              finalData['products'] = [];

            }
            if (typeof dataOthers !== 'undefined' && dataOthers.length > 0) {
              finalData['products'] = dataOthers;
            }
            callback1();
          });
      } else {
        finalData['products'] = [];
        callback1();
      }
    }, function (callback1) {
      if (typeof finalData['products'] !== 'undefined' && finalData['products'].length > 0) {
        async.forEach(finalData['products'], function fct(selection, callback) {
          var sqlGetChildren = tools.queryAllMedia('product', lang, selection.id);
          tools.executeAsynGetMedia(connection, sqlGetChildren, selection, function (data) {
            callback();
          });
        }, function (err) {
          if (err) return next(err);
          callback1();
        });
      } else {
        callback1();
      }
    }
  ], function fct() {
    return res.status(200).json(finalData);
  });
}

exports.retrieveDataByCollection = retrieveDataByCollection;


