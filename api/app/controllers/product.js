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
const retrieveDataByUrl = function fct(req, res) {
  var finalData = {};
  // 1 -- retrieve lng
  var lang = req.params.lng;
  const url = req.params.url;
  // 2 -- check if params exists.
  if (!lang || !tools.arrayContains(LANG, lang)) {
    lang = DEFAULT_LANG;
  }
  if (!url) {
    return res.status(500).json('URL MANQUANTE');
  }

  // --- 3 retrieve product By URL
  const sqlMainContent = tools.queryMainsContent('product', url, lang);
  finalData = {
    'univers': 'product',
    'lang': lang
  };
  async.series([

    // content
    function (callback1) {
      connection.query(sqlMainContent,
        function (error, dataMainContent) {
          if (error || dataMainContent.length === 0) {
            finalData['data'] = {};

          }
          if (typeof dataMainContent !== 'undefined' && dataMainContent.length > 0 && typeof dataMainContent[0] !== 'undefined') {
            finalData['data'] = dataMainContent[0];
          }
          callback1();
        });
    },
    // config
    function (callback1) {
      if (typeof finalData['data'] !== 'undefined' && typeof  finalData['data'].id !== 'undefined') {
        connection.query("Select price, quantity, delivery_days from product_config where id_product=" + finalData['data'].id,
          function (error, dataConfig) {
            if (error || dataConfig.length === 0) {
              finalData['config'] = {};

            }
            if (typeof dataConfig !== 'undefined' && dataConfig.length > 0 && typeof dataConfig[0] !== 'undefined') {
              finalData['config'] = dataConfig[0];
            }
            callback1();
          });
      } else {
        finalData['config'] = {};
        callback1();
      }
    },
    // media
    function (callback1) {
      if (typeof finalData['data'] !== 'undefined' && typeof  finalData['data'].id !== 'undefined') {
        const sqlMedia = tools.queryAllMedia('product', lang, finalData['data'].id);
        connection.query(sqlMedia,
          function (error, dataMedia) {

            if (error || typeof dataMedia === 'undefined' || dataMedia.length === 0) {
              finalData['media'] = [];

            }
            else if (typeof dataMedia !== 'undefined' && dataMedia.length > 0) {
              finalData['media'] = dataMedia;

            }
            callback1();
          });
      } else {
        finalData['media'] = [];
        callback1();
      }
    },
    // seo
    function (callback1) {
      if (typeof finalData['data'] !== 'undefined' && typeof  finalData['data'].id !== 'undefined') {
        const sqlSeo = tools.querySeo('product', finalData['data'].id, lang);
        connection.query(sqlSeo,
          function (error, dataSeo) {
            if (error || dataSeo.length === 0) {
              finalData['seo'] = {};

            }
            if (typeof dataSeo !== 'undefined' && dataSeo.length > 0) {
              finalData['seo'] = dataSeo[0];
            }
            callback1();
          });
      } else {
        finalData['seo'] = {};
        callback1();
      }
    },
    // collection
    function (callback1) {
      if (typeof finalData['data'] !== 'undefined' && typeof  finalData['data'].id !== 'undefined') {
        const sqlCollection = tools.queryCollectionForProduct('collection', lang, finalData['data'].id);
        connection.query(sqlCollection,
          function (error, dataCollection) {
            if (error || dataCollection.length === 0) {
              finalData['collection'] = {};

            }
            if (typeof dataCollection !== 'undefined' && dataCollection.length > 0) {
              finalData['collection'] = dataCollection[0];
            }
            callback1();
          });
      } else {
        finalData['collection'] = {};
        callback1();
      }
    },
    // collection_media
    function (callback1) {
      if (typeof finalData['collection'] !== 'undefined' && typeof  finalData['collection'].id !== 'undefined') {
        var sqlGetChildren = tools.queryAllMedia('collection_landing', lang, finalData['collection'].id);
        tools.executeAsynGetMedia(connection, sqlGetChildren, finalData['collection'], function (data) {
          callback1();
        });
      }
    },
    // other product de la même collection
    function (callback1) {
      if (typeof finalData['data'] !== 'undefined' && typeof  finalData['data'].id !== 'undefined') {
        const sqlOther = tools.querySelectionSameCollectionOther('product', lang, finalData['data'].id);
        connection.query(sqlOther,
          function (error, dataOthers) {
            if (error || dataOthers.length === 0) {
              finalData['suggestions'] = [];

            }
            if (typeof dataOthers !== 'undefined' && dataOthers.length > 0) {
              finalData['suggestions'] = dataOthers;
            }
            callback1();
          });
      } else {
        finalData['suggestions'] = [];
        callback1();
      }
    }, function (callback1) {
      if (typeof finalData['suggestions'] !== 'undefined' && finalData['suggestions'].length > 0) {
        async.forEach(finalData['suggestions'], function fct(selection, callback) {
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

exports.retrieveDataByUrl = retrieveDataByUrl;
