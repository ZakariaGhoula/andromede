var connection = require('./../connection');
var moment = require('moment');
const tools = require('./../helpers/tools');
const DEFAULT_LANG = require('./../constants').DEFAULT_LANG;
const LANG = require('./../constants').LANG;
const async = require('async');
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

  // --- 3 retrieve News By URL
  const sqlMainContent = tools.queryMainsContent('news', url, lang);
  connection.query(sqlMainContent,
    function fctSeo(error, content) {
      if (error) {
        console.log(error);
        return res.status(500).json(error);
      }
      if (content.length === 0) {
        return res.status(404).json("Not found");
      }
      // 3 -- retrieve data seo
      const sqlSeo = tools.querySeo('news', content[0].id, lang);
      connection.query(sqlSeo,
        function fctSeo(error, homeSeo) {
          if (error) {
            console.log(error);
          }
          // -- 4 retrieve Sections
          const sqlSections = tools.querySection('news', lang, content[0].id);
          connection.query(sqlSections,
            function fctSection(errorSec, homeSections) {
              if (errorSec) {
                console.log(errorSec);
                return res.status(500).json(errorSec);
              }
              async.forEach(homeSections, function (query, callback) {
                var sqlSectionMedia = tools.querySectionMedia('news', lang, query.id_section);
                tools.executeAsynSectionMedia(connection, sqlSectionMedia, query, function (data) {
                  callback();
                });
              }, function (err) {
                if (err) return next(err);
                const sqlGetLandingHouse = tools.queryLandingNewsHouse('house', lang, content[0].id);
                connection.query(sqlGetLandingHouse,
                  function fctSeo(error, HouseNewsLandings) {
                    if (error) {
                      console.log(error);
                      return res.status(500).json(error);
                    }
                    async.forEach(HouseNewsLandings, function fct(query, callback) {
                      var sqlGetChildren = tools.queryHouseChildren('house', query.id_house);
                      tools.executeAsynGetChildren(connection, sqlGetChildren, query, function (data) {
                        callback();
                      });
                    }, function (err) {
                      if (err) return next(err);
                      async.forEach(HouseNewsLandings, function fct(query, callback) {
                        var sqlSectionMedia = tools.queryLandingMedia('house', lang, query.id_landing);
                        tools.executeAsynSectionMedia(connection, sqlSectionMedia, query, function (data) {
                          callback();
                        });
                      }, function (err) {
                        if (err) return next(err);
                        // -- TODO retrieve LANDINGS if id_type_section = 24
                        finalData = {
                          'univers': 'news',
                          'lang': lang,
                          'alt_lang': (lang === DEFAULT_LANG) ? 'en' : DEFAULT_LANG,
                          'content': (typeof content[0] !== 'undefined') ? content[0] : {},
                          'seo': (typeof homeSeo[0] !== 'undefined') ? homeSeo[0] : {},
                          'sections': homeSections,
                          'landingsHouse': HouseNewsLandings,
                        }
                        return res.status(200).json(finalData);
                        // });
                      });
                    });
                  });
              });
            });
        });
    });
};
exports.retrieveDataByUrl = retrieveDataByUrl;


// --- retrieve data by url lng
const retrieveDataLanding = function fct(req, res) {
  var finalData = {};
  var pagination = {};
  // 1 -- retrieve lng
  var lang = req.params.lng;

  var page = req.query.page;
  var page_size = req.query.page_size;
  var news_type = (!req.query.type) ? null : (req.query.type);
  // 2 -- check if params exists.
  if (!lang || !tools.arrayContains(LANG, lang)) {
    lang = DEFAULT_LANG;
  }
  if (!page) {
    page = 1;
  }
  if (!page_size) {
    page_size = 12;
  }

  // -- 3 count total
  const landingTotal = tools.queryLandingNews('news', lang, news_type, null, null);
  const landingTotalPaginate = tools.queryLandingNews('news', lang, news_type, parseInt(page_size, 12), parseInt(page_size, 12) * ((parseInt(page, 12) > 1) ? parseInt(page, 12) - 1 : 0));

  const sqlSeo = tools.querySeo('news', 0, lang);
  connection.query(sqlSeo,
    function fctSeo(error, homeSeo) {
      if (error) {
        console.log(error);
        // return res.status(500).json(error);
      }

      connection.query(landingTotal,
        function fctSection(errorSec, landings) {
          if (errorSec) {
            console.log(errorSec);
            return res.status(500).json(errorSec);
          }
          connection.query(landingTotalPaginate,
            function fctPaginate(error, landingsPaginate) {
              if (error) {
                console.log(error);
                return res.status(500).json(error);
              }

              async.forEach(landingsPaginate, function fct(query, callback) {
                var sqlSectionMedia = tools.queryLandingMedia('news', lang, query.id_landing);
                tools.executeAsynSectionMedia(connection, sqlSectionMedia, query, function (data) {
                  callback();
                });

                // -- TODO retrieve LANDINGS if id_type_section = 24
              }, function (err) {
                if (err) return next(err);
                pagination = {
                  'current': page,
                  'previous': (parseInt(page, 12) === 1) ? null : parseInt(page, 12) - 1,
                  'next': (parseInt(page, 12) + 1) <= Math.round(landings.length / parseInt(page_size, 12)) ? (parseInt(page, 12) + 1) : null,
                  'per_page': parseInt(page_size, 12),
                  'pages': Math.round(landings.length / parseInt(page_size, 12)),
                  'count': landings.length
                };
                homeSeo[0]['isPagination'] = true;
                homeSeo[0]['pagination'] = pagination;
                finalData = {
                  'univers': 'news',
                  'type': news_type,
                  'lang': lang,
                  'seo': (typeof homeSeo[0] !== 'undefined') ? homeSeo[0] : {},
                  'alt_lang': (lang === DEFAULT_LANG) ? 'en' : DEFAULT_LANG,
                  'pagination': pagination,
                  'landing': landingsPaginate,
                }
                return res.status(200).json(finalData);
              });
            });
        });
    });
}
exports.retrieveDataLanding = retrieveDataLanding;


// récupération de toutes les news en une requête, avec paramètre de pagination
var getNews2 = function (req, res, next) {
  const returnData = [];
  const returnDataFinal = [];
  var jeton = 'pdh-site-news-';
  var lang = 'fr';
  if (typeof req.query.lang !== 'undefined') {
    lang = req.query.lang;
  }
  jeton += lang;
  var filtre = null;
  if (typeof req.query.filtre !== 'undefined') {
    filtre = req.query.filtre;
    jeton += '-' + filtre;
  }

  var first_request = "select n.news_type as type1, nl.id_news,n.created, n.updated," +
    " n.url, nland.online, nl.lang,nlandl.title as tpage, nlandl.description as descItem,nlm.id_media, m.*, ml.* " +
    " FROM news_lang nl , news n,news_landing nland,news_landing_lang nlandl,news_landing_media nlm, n_media m , n_media_lang ml" +
    " WHERE n.id_news = nl.id_news and  nland.id_news = nl.id_news " +
    "and  nland.id_news_landing = nlandl.id_news_landing " +
    " and nl.lang = nlandl.lang " +
    " and nlm.online=1 and nlm.id_media = m.id_media and m.id_media = ml.id_media and ml.lang = nl.lang " +
    "and n.online=1 and nlm.id_news_landing = nland.id_news_landing " +
    "and nland.online  = 1 and n.publish_on<='" + moment().format('YYYY-MM-DD') + "' and nl.lang = '" + lang + "'";
  if (filtre !== null) {
    if (parseInt(filtre) != 5 && parseInt(filtre) != 9 && parseInt(filtre) != 13) {
      first_request += " and n.news_type != 13 AND n.news_type != 9 AND n.news_type != 5 "
    }
    else {
      first_request += " and n.news_type =" + filtre;
    }
  }
  first_request += "   order by publish_on desc";
  connection.query(first_request,
    function (error, ListNews) {
      if (error) {
        console.log(error);
      }
      var returnData = [];
      if (typeof ListNews !== 'undefined' && ListNews.length > 0) {
        for (var i in ListNews) {
          if (ListNews[i].path.trim() !== "") {
            var objLanding = {
              id_news: ListNews[i].id_news,
              lang: ListNews[i].lang,
              title: ListNews[i].tpage,
              description: ListNews[i].descItem,
              url: ListNews[i].url,
              created: ListNews[i].created,
              updated: ListNews[i].updated,
              type: ListNews[i].type1,
              online: ListNews[i].online,
              media: {
                id_media: ListNews[i].id_media,
                file_name: ListNews[i].file_name,
                base_path: ListNews[i].base_path,
                path: ListNews[i].path,
                alt: ListNews[i].alt
              }
            };
            returnData.push(objLanding);
          }
        }
      }
      return res.status(200).json({
        data: returnData
      })
    });
}

exports.getNews2 = getNews2;
var getNews = function (req, res, next) {
  const returnData = [];
  const returnDataFinal = [];
  var jeton = 'pdh-site-news-';
  var lang = 'fr';
  if (typeof req.query.lang !== 'undefined') {
    lang = req.query.lang;
  }
  jeton += lang;
  filtre = null;


  var request = 'select news.news_type as news_type, news.id_news, media.id_media, media.path,' +
    ' media_lang.alt, media.type, news_landing_lang.description, news_landing_lang.title, news_lang.url,' +
    ' news.created, news.updated, news_landing.ordering, news_lang.lang from news_lang inner join news on' +
    ' news_lang.id_news = news.id_news inner join news_landing on news_landing.id_news = news.id_news' +
    ' inner join news_landing_lang on news_landing_lang.id_news_landing = news_landing.id_news_landing inner join news_landing_media on news_landing_lang.id_news_landing = news_landing_media.id_news_landing inner join media on media.id_media = news_landing_media.id_media inner join media_lang on media.id_media = media_lang.id_media where news_lang.lang = news_landing_lang.lang AND media_lang.lang = news_lang.lang AND news_landing_media.online = 1 AND news_landing.online = 1 AND news.online = 1';

  if (typeof req.query.filtre !== 'undefined') {
    var filtre = req.query.filtre;

    jeton = jeton + filtre;
    if (isNaN(parseInt(filtre)) === false) {
      if (parseInt(filtre) != 5 && parseInt(filtre) != 9 && parseInt(filtre) != 13) {
        console.log('ok');
        if (typeof requestfinal !== 'undefined') {
          var requestfinal = requestfinal + ' and news.news_type != 13 AND news.news_type != 9 AND news.news_type != 5';
        } else {
          requestfinal = request + ' and news.news_type != 13 AND news.news_type != 9 AND news.news_type != 5';
        }
      } else {
        console.log('nok');
        if (typeof requestfinal !== 'undefined') {
          var requestfinal = requestfinal + ' and news.news_type = \'' + filtre + '\'';
        } else {
          requestfinal = request + ' and news.news_type = \'' + filtre + '\'';
        }
      }
    }
  }
  if (typeof req.query.lang !== 'undefined') {
    var lang = req.query.lang;
    jeton = jeton + lang;
    if (typeof requestfinal !== 'undefined') {
      var requestfinal = requestfinal + ' and news_lang.lang = \'' + lang + '\'';
    } else {
      requestfinal = request + ' and news_lang.lang = \'' + lang + '\'';
    }
  } else {
    lang = 'fr';
    jeton = jeton + lang;
    if (typeof requestfinal !== 'undefined') {
      var requestfinal = requestfinal + ' and news_lang.lang = \'' + lang + '\'';
    } else {
      requestfinal = request + ' and news_lang.lang = \'' + lang + '\'';
    }
  }

  requestfinal += ' GROUP BY news.id_news, media.id_media, media_lang.alt, news_landing_lang.description, news_landing_lang.title, news_landing.ordering, news_lang.url, news_lang.lang, news.news_type';
  // pagination
  /* if (typeof req.param('currentPage') !== 'undefined' && typeof req.param('nbByPage') !== 'undefined') {
   var currentPage = parseInt(req.param('currentPage'));
   const nbByPage = (typeof req.param('nbByPage') !== 'undefined') ? parseInt(req.param('nbByPage')) : 5;
   const offset = (currentPage > 1) ? (currentPage - 1) * nbByPage : 0;
   var nbrMax = currentPage * nbByPage;
   jeton = jeton + "-" + nbByPage + "-" + nbrMax + "-" + offset;
   if (typeof requestfinal !== 'undefined') {
   requestfinal = requestfinal + ' LIMIT ' + nbrMax + ' OFFSET ' + offset + '';
   } else {
   requestfinal = request + ' LIMIT ' + nbrMax + ' OFFSET ' + offset + '';
   }
   } else {
   var currentPage = 'undefined';
   var nbrMax = 'undefined';
   } */
  if (typeof requestrequestfinal === 'undefined') {
    requestfinal = request;
  }


  console.log(jeton);
  //création du jeton
  /*
   client.exists(jeton, function (err, reply) {
   if (reply === 1) {
   client.hgetall(jeton, function (err, data) {
   return res.status(200).json(JSON.parse(data.data));
   });

   } else {
   // insert le jeton
   */
  connection.query(requestfinal,
    function (error, news) {
      if (error) {
        console.log(error);
      }
      console.log(news.length);
      for (var i in news) {
        const result = news[i];

        var objReturn = {};
        // récupération data landings

        if (typeof result.id_media !== 'undefined'
          && result.b !== 'undefined'
          && result.alt !== 'undefined'
          && result.type !== 'undefined') {
          objReturn['news_landing_media'] = {
            'id_landing_media_news': result.id_media,
            'landing_path': result.path,
            'landing_alt': result.alt,
            'landing_type': result.type
          };
        }

        if (typeof result.title !== 'undefined'
          && result.description !== 'undefined'
          && result.url !== 'undefined') {
          objReturn['content_news_landing'] = {
            'news_content': result.news_content,
            'news_landing_lang_title': result.title,
            'news_landing_lang_description': result.description,
            'meta_description': result.meta_description,
            'news_url': result.url,
            'news_type': result.news_type
          };
        }
        if (typeof result.created !== 'undefined' && result.updated !== 'undefined') {
          objReturn['news_landings_dates'] = {
            'created': result.created,
            'updated': result.updated,
          };
        }
        if (typeof result.ordering !== 'undefined' && result.lang !== 'undefined') {
          objReturn['info_news_media'] = {
            'ordering': result.ordering,
            'lang': result.lang,
          };
        }

        // récupération data element

        returnData.push(objReturn);        // 'updated': results.updated,
      }
      const final = {
        /*  pagination: {
         current_page: currentPage,
         next: currentPage + 1,
         prev: currentPage - 1,
         nbr_max: nbrMax,
         count: returnData.length,
         count_total: 1
         }, */
        data: returnData
      };

      var dataChange = JSON.stringify(final);
      /*  client.hmset(jeton, {
       data: dataChange
       });
       client.expire(jeton, 86400);

       */
      return res.status(200).json(final)
    });
  /*  }
   });*/
};

exports.getNews = getNews;

var getNewsElements = function (req, res, next) {
  const returnData = [];
  const returnDataFinal = [];
  var request = 'select news_lang_element.id_element, n_element.id_element_type, news.url as news_url,' +
    ' news_media.id_media as id_media_news, news_landing_media.id_media as id_landing_media_news,' +
    ' n_element_media.id_media as id_media_element, ' +
    'media_element.path as element_path, media_news.path as news_media_path, media_landing.path as landing_path, ' +
    'media_element.type as element_type, media_news.type as news_media_type, media_landing.type as landing_type, ' +
    'media_lang_element.alt as element_alt, media_lang_news.alt as news_media_alt, media_lang_landing.alt as landing_alt, news.name as news_name, ' +
    'n_element_type.name as name_element, news_lang.content as news_content, n_element.content as element_content, n_element.title as element_title,' +
    ' news_landing_lang.title as news_landing_lang_title, media_lang_news.title as media_title, news_landing_lang.description as news_landing_lang_description,' +
    ' media_lang_news.description as media_description, created, updated, news_landing.ordering as news_landing_ordering ' +
    'from news_lang inner join news on news_lang.id_news = news.id_news inner join news_lang_element on news_lang_element.id_news = news.id_news inner ' +
    'join n_element on n_element.id_element = news_lang_element.id_element inner join n_element_type ' +
    'on n_element.id_element_type = n_element_type.id_element_type inner join n_element_media on n_element.id_element = n_element_media.id_element' +
    ' inner join media as media_element on media_element.id_media = n_element_media.id_media inner join media_lang as media_lang_element on media_element.id_media = media_lang_element.id_media inner join news_landing on news_landing.id_news = news.id_news inner join news_landing_lang on news_landing_lang.id_news_landing = news_landing.id_news_landing inner join news_landing_media on news_landing_lang.id_news_landing = news_landing_media.id_news_landing inner join media as media_landing on media_landing.id_media = news_landing_media.id_media inner join media_lang as media_lang_landing on media_landing.id_media = media_lang_landing.id_media inner join news_media on news_media.id_news = news.id_news inner join media as media_news on media_news.id_media = news_media.id_media inner join media_lang as media_lang_news on media_news.id_media = media_lang_news.id_media where news_lang.lang = news_landing_lang.lang AND media_lang_landing.lang = news_lang.lang AND media_lang_news.lang = news_lang.lang AND media_lang_element.lang = news_lang.lang AND news_landing_media.online = 1 AND news_landing.online = 1 AND news.online = 1';
  var jeton = 'pdh-site-news-element';
  // paramètre de langue
  if (typeof req.param('url') !== 'undefined') {
    var url = req.param('url');
    jeton = jeton + '-' + url;
    if (typeof requestfinal !== 'undefined') {
      var requestfinal = requestfinal + ' and news_lang.url = \'' + url + '\'';
    } else {
      requestfinal = request + ' and news_lang.url = \'' + url + '\'';
    }
  }
  if (typeof req.param('lang') !== 'undefined') {
    var lang = req.param('lang');
    jeton = jeton + lang;
    if (typeof requestfinal !== 'undefined') {
      var requestfinal = requestfinal + ' and news_lang.lang = \'' + lang + '\'';
    } else {
      requestfinal = request + ' and news_lang.lang = \'' + lang + '\'';
    }
  } else {
    lang = 'fr';
    jeton = jeton + lang;
    if (typeof requestfinal !== 'undefined') {
      var requestfinal = requestfinal + ' and news_lang.lang = \'' + lang + '\'';
    } else {
      requestfinal = request + ' and news_lang.lang = \'' + lang + '\'';
    }
  }

  // pagination
  if (typeof req.param('currentPage') !== 'undefined') {
    var currentPage = parseInt(req.param('currentPage'));
    const nbByPage = (typeof req.param('nbByPage') !== 'undefined') ? parseInt(req.param('nbByPage')) : 5;
    const offset = (currentPage > 1) ? (currentPage - 1) * nbByPage : 0;
    var nbrMax = currentPage * nbByPage;
    jeton = jeton + "-" + nbByPage + "-" + nbrMax + "-" + offset;
    if (typeof requestfinal !== 'undefined') {
      requestfinal = requestfinal + ' LIMIT ' + nbrMax + ' OFFSET ' + '0' + '';
    } else {
      requestfinal = request + ' LIMIT ' + nbrMax + ' OFFSET ' + '0' + '';
    }
  } else {
    var currentPage = 'undefined';
    var nbrMax = 'undefined';
  }
  if (typeof requestfinal === 'undefined') {
    requestfinal = request;
  }

  console.log(jeton);
  //création du jeton
  /*
   client.exists(jeton, function (err, reply) {
   if (reply === 1) {
   client.hgetall(jeton, function (err, data) {
   return res.status(200).json(JSON.parse(data.data));
   });

   } else {
   // insert le jeton
   */
  connection.query(requestfinal,
    function (error, news) {
      if (error) {
        console.log(error);
      }
      if (news.length === 0) {
        return res.status(404).send({error: 'not found'});
      }
      for (var i in news) {
        const result = news[i];
        var objReturn = {};

        // récupération data element

        if (typeof result.id_media_element !== 'undefined'
          && result.element_path !== 'undefined'
          && result.element_alt !== 'undefined'
          && result.element_type !== 'undefined') {
          objReturn['section_media'] = {
            'id_media': result.id_media_element,
            'path': result.element_path,
            'alt': result.element_alt,
            'type': result.element_type
          };
        }

        if (typeof result.name_element !== 'undefined'
          && result.element_content !== 'undefined'
          && result.element_title !== 'undefined'
          && result.description !== 'undefined'
          && result.id_element_type !== 'undefined'
          && result.meta_description !== 'undefined'
          && result.url !== 'undefined') {
          objReturn['content_section'] = {
            'name_element': result.name_element,
            'content_html': result.element_content,
            'title_home': result.element_title,
            'description': result.description,
            'meta_description': result.meta_description,
            'url': result.url,
            'element_type': result.id_element_type,
            'id_element': result.id_element,
          };
        }
        if (typeof result.name !== 'undefined' && result.slug !== 'undefined') {
          objReturn['section_dates'] = {
            'name': result.name,
            'slug': result.slug,
          };
        }

        if (typeof result.name !== 'undefined' && result.slug !== 'undefined') {
          objReturn['section_type'] = {
            'name': result.name,
            'slug': result.slug,
          };
        }
        returnData.push(objReturn);        // 'updated': results.updated,
      }

      var request = 'select * from news_lang inner join news on news_lang.id_news = news.id_news inner join news_lang_element on news_lang_element.id_news = news.id_news inner join n_element on n_element.id_element = news_lang_element.id_element inner join n_element_type on n_element.id_element_type = n_element_type.id_element_type inner join n_element_media on n_element.id_element = n_element_media.id_element inner join media on media.id_media = n_element_media.id_media inner join media_lang on media.id_media = media_lang.id_media where news_lang.lang = media_lang.lang AND news.online =1 ';

      if (typeof req.param('url') !== 'undefined') {
        var url = req.param('url');
        jeton = jeton + url;
        if (typeof requestfinal !== 'undefined') {
          var requestfinal = requestfinal + ' and news_lang.url = \'' + url + '\'';
        } else {
          requestfinal = request + ' and news_lang.url = \'' + url + '\'';
        }
      }
      if (typeof req.param('lang') !== 'undefined') {
        var lang = req.param('lang');
        jeton = jeton + lang;
        if (typeof requestfinal !== 'undefined') {
          var requestfinal = requestfinal + ' and news_lang.lang = \'' + lang + '\'';
        } else {
          requestfinal = request + ' and news_lang.lang = \'' + lang + '\'';
        }
      } else {
        lang = 'fr';
        jeton = jeton + lang;
        if (typeof requestfinal !== 'undefined') {
          var requestfinal = requestfinal + ' and news_lang.lang = \'' + lang + '\'';
        } else {
          requestfinal = request + ' and news_lang.lang = \'' + lang + '\'';
        }
      }

      requestfinal += '';
      connection.query(requestfinal,
        function (error, PageSection) {
          if (error) {
            console.log(error);
          }

          for (var i in PageSection) {
            const result = PageSection[i];
            var objectReturnFinal = {};
            var loadedData = [];
            var id = result.id_element;
            for (var tabData = 0; tabData < returnData.length; tabData++) {
              if (returnData[tabData].content_section.id_element === id) {
                loadedData.push(returnData[tabData]);
              }
            }
            if (typeof result.id_element_type !== 'undefined'
              && result.type !== 'undefined'
              && result.ordering !== 'undefined'
              && result.lang !== 'undefined') {
              objectReturnFinal['section_parameters'] = {
                'id_section': result.id_element_type,
                'id_element': result.id_element,
                'ordering': result.ordering,
                'last_update': result.updated,
                'lang': result.lang,
                'data': loadedData
              };
            }
            returnDataFinal.push(objectReturnFinal);
          }
          const final = {
            SectionParameters: returnDataFinal
          };

          var dataChange = JSON.stringify(final);
          /*   client.hmset(jeton, {
           data: dataChange
           });
           client.expire(jeton, 86400);*/
          return res.json(final)

        });
    });
  /*
   }
   });*/
};

exports.getNewsElements = getNewsElements;

