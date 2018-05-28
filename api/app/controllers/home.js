const connection = require('./../connection');
const tools = require('./../helpers/tools');
const DEFAULT_LANG = require('./../constants').DEFAULT_LANG;
const LANG = require('./../constants').LANG;
const async = require('async');

var _ = require('lodash');
/*
 var client = require('./../redisClient');
 client.on('connect', function () {
 console.log('connected');
 });*/

// --- retrieve data by lng
const retrieveDataHome = function fct(req, res) {
    var finalData = {};
    // 1 -- retrieve lng
    var lang = req.params.lng;
    // 2 -- check if params exists.
    if (!lang || !tools.arrayContains(LANG, lang)) {
      lang = DEFAULT_LANG;
    }
    finalData = {
      'univers': 'home',
      'lang': lang,
      'alt_lang': (lang === DEFAULT_LANG) ? 'en' : DEFAULT_LANG,

    }
    async.series([

      // content
      function (callback1) {
        const sqlSeo = tools.querySeo('home', 1, lang);
        connection.query(sqlSeo,
          function fctSeo(error, homeSeo) {
            if (error) {
              console.log(error);
              // return res.status(500).json(error);
            }
            finalData['seo'] = (typeof homeSeo !== 'undefined' && typeof homeSeo[0] !== 'undefined') ? homeSeo[0] : {};
            callback1();
          });
      }, function (callback1) {
        const sqlSelect = tools.querySelectionHome('product', lang);
        connection.query(sqlSelect,
          function fctSeo(error, homeSelection) {
            if (error) {
              console.log(error);
              // return res.status(500).json(error);
            }
            finalData['selections'] = (typeof homeSelection !== 'undefined' && typeof homeSelection[0] !== 'undefined') ? homeSelection : [];
            callback1();
          });
      }, function (callback1) {
        if (typeof finalData['selections'] !== 'undefined' && finalData['selections'].length > 0) {
          async.forEach(finalData['selections'], function fct(selection, callback) {
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
      }, function (callback1) {
        const sqlSelect = tools.queryCollectionHome('collection', lang);
        connection.query(sqlSelect,
          function fctSeo(error, homeSelection) {
            if (error) {
              console.log(error);
              // return res.status(500).json(error);
            }
            finalData['collections'] = (typeof homeSelection !== 'undefined' && typeof homeSelection[0] !== 'undefined') ? homeSelection : [];
            callback1();
          });
      }, function (callback1) {
        if (typeof finalData['collections'] !== 'undefined' && finalData['collections'].length > 0) {
          async.forEach(finalData['collections'], function fct(collection, callback) {
            var sqlGetChildren = tools.queryAllMedia('collection_landing', lang, collection.id);
            tools.executeAsynGetMedia(connection, sqlGetChildren, collection, function (data) {
              callback();
            });
          }, function (err) {
            if (err) return next(err);
            callback1();
          });
        } else {
          callback1();
        }
      },
    ], function () {

      return res.status(200).json(finalData);
    });
    // 3 -- retrieve data seo


    /*
    // -- 4 retrieve Sections
    const sqlSections = tools.querySection('home', lang);
    connection.query(sqlSections,
      function fctSection(errorSec, homeSections) {
        if (errorSec) {
          console.log(errorSec);
          return res.status(500).json(errorSec);
        }
        async.forEach(homeSections, function (query, callback) {
          var sqlSectionMedia = tools.querySectionMedia('home', lang, query.id_section);
          tools.executeAsynSectionMedia(connection, sqlSectionMedia, query, function (data) {
            callback();
          });

          // -- TODO retrieve LANDINGS if id_type_section = 24
        }, function (err) {
          if (err) return next(err);
          const sqlLandings = tools.queryHomeLandings('house', lang);
          connection.query(sqlLandings,
            function fctSection(errorSec, homeLandings) {
              if (errorSec) {
                console.log(errorSec);
                return res.status(500).json(errorSec);
              }

              async.forEach(homeLandings, function fct(query, callback) {
                var sqlGetChildren = tools.queryHouseChildren('house', query.id_house);
                tools.executeAsynGetChildren(connection, sqlGetChildren, query, function (data) {
                  callback();
                });
              }, function (err) {
                if (err) return next(err);

                async.forEach(homeLandings, function fct(query, callback) {
                  var sqlSectionMedia = tools.queryLandingMedia('house', lang, query.id_landing);
                  tools.executeAsynSectionMedia(connection, sqlSectionMedia, query, function (data) {
                    callback();
                  });
                }, function (err) {
                  if (err) return next(err);

                  var tabLandings = {
                    'landings': homeLandings,
                    'id_type_section': 24,
                  };
                  var newSectiontab2 = [];
                  var indexToInsertAvis = null;
                  var tabAvis = [];
                  var tabToDeleteAvis = [];
                  for (var tab in homeSections) {
                    if (homeSections[tab].id_type_section === 24) {
                      homeSections[tab] = (tabLandings);
                    }
                    if (homeSections[tab].id_type_section === 26) {
                      tabAvis.push(homeSections[tab]);
                      tabToDeleteAvis.push(tab);
                    }
                  }
                  var kind = 0;
                  for (var tab in homeSections) {
                    if (!_.includes(tabToDeleteAvis, tab)) {
                      newSectiontab2[kind] = (homeSections[tab]);
                      kind++;
                    } else if (indexToInsertAvis === null) {
                      newSectiontab2[kind] = {};
                      kind++;
                      indexToInsertAvis = tab;
                    }
                  }
                  var avis = {
                    'avis': tabAvis,
                    'id_type_section': 26,
                  };
                  if (indexToInsertAvis !== null) {
                    newSectiontab2[indexToInsertAvis] = avis;
                  }

                  finalData = {
                    'univers': 'home',
                    'lang': lang,
                    'alt_lang': (lang === DEFAULT_LANG) ? 'en' : DEFAULT_LANG,
                    'seo': (typeof homeSeo[0] !== 'undefined') ? homeSeo[0] : {},
                    'sections': newSectiontab2,
                  }
                  return res.status(200).json(finalData);
                });
              });
            });
        });
      });*/
  }
;
exports.retrieveDataHome = retrieveDataHome;