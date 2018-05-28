const mysql = require('mysql');
const moment = require('moment');
//-- test if array contains a value
const arrayContains = function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}
exports.arrayContains = arrayContains;

// -- builder of query seo
const querySeo = function seoBuilder(table, idSeo, lang) {
  const tableToQuery = table + '_seo';

  var query = 'SELECT andromedeetpersee.' + tableToQuery + '.title,' +
    ' andromedeetpersee.' + tableToQuery + '.description,' +
    ' andromedeetpersee.' + tableToQuery + '.url_canonical,' +
    ' andromedeetpersee.' + tableToQuery + '.url_alt, ' +
    ' andromedeetpersee.' + tableToQuery + '.og_title,' +
    ' andromedeetpersee.' + tableToQuery + '.og_description, ' +
    ' andromedeetpersee.' + table + '_media.path as og_media ' +
    ' ' +
    'FROM andromedeetpersee.' + tableToQuery + ' ' +
    'LEFT JOIN andromedeetpersee.' + table + '_media ON andromedeetpersee.' + table + '_media.id_media = andromedeetpersee.' + tableToQuery + '.og_id_media ' +
    'WHERE andromedeetpersee.' + tableToQuery + '.lang=' + mysql.escape(lang) + ' ';
  if (table === 'home') {
    query += ' and andromedeetpersee.' + tableToQuery + '.id_' + tableToQuery + ' = ' + idSeo;
  } else {
    query += ' and andromedeetpersee.' + tableToQuery + '.id_' + table + ' = ' + idSeo;
  }
  return query;

}
exports.querySeo = querySeo;

// -- builder of query main content url lang
const queryMainsContent = function seoBuilder(table, url, lang) {

  var query = 'SELECT andromedeetpersee.' + table + '.id_' + table + ' as id,' +
    ' andromedeetpersee.' + table + '_lang.title,' +
    ' andromedeetpersee.' + table + '_lang.url,' +
    '';
  if (table === 'news') {
    query += ' andromedeetpersee.' + table + '.publish_on';
  } else if (table === 'product') {
    query += ' andromedeetpersee.' + table + '_lang.description,';
    query += ' andromedeetpersee.' + table + '_lang.ingredient,';
    query += ' andromedeetpersee.' + table + '_lang.advice';
  } else {
    query += ' "" as publish_on';
  }

  query += ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang ' +
    ' WHERE andromedeetpersee.' + table + '_lang.lang=' + mysql.escape(lang) + ' ' +
    ' and andromedeetpersee.' + table + '_lang.url = ' + mysql.escape(url) +
    ' and andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' and andromedeetpersee.' + table + '.online = 1 and andromedeetpersee.' + table + '.publish_on<=' + mysql.escape(moment().format("YYYY-MM-DD HH:ss:mm")) + '';
  return query;
}
exports.queryMainsContent = queryMainsContent;// -- builder of query main content url lang
const queryMainsContentPk = function seoBuilder(table, id, lang) {

  var query = 'SELECT andromedeetpersee.' + table + '.id_' + table + ' as id,' +
    ' andromedeetpersee.' + table + '_lang.title,' +
    ' andromedeetpersee.' + table + '_lang.url,' +
    '';
  if (table === 'news') {
    query += ' andromedeetpersee.' + table + '.publish_on';
  } else {
    query += ' "" as publish_on';
  }

  query += ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang ' +
    ' WHERE andromedeetpersee.' + table + '_lang.lang=' + mysql.escape(lang) + ' ' +
    ' and andromedeetpersee.' + table + '_lang.id_' + table + '  = ' + mysql.escape(id) +
    ' and andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' and andromedeetpersee.' + table + '.online = 1 and andromedeetpersee.' + table + '.publish_on<=' + mysql.escape(moment().format("YYYY-MM-DD HH:ss:mm")) + '';
  return query;
}
exports.queryMainsContentPk = queryMainsContentPk;
// -- builder of product media
const queryAllMedia = function sectionMediaBuilder(table, lang, idSection) {

  var query = 'SELECT andromedeetpersee.' + table + '_media_lang.id_media, path,base_path, file_name, height, width, type,title,alt' +
    ' FROM andromedeetpersee.' + table + '_media_lang, andromedeetpersee.' + table + '_media ' +
    ' WHERE andromedeetpersee.' + table + '_media_lang.id_media = andromedeetpersee.' + table + '_media.id_media' +
    ' AND andromedeetpersee.' + table + '_media_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_media.id_' + table + ' = ' + idSection + '' +
    ' ';
  return query;
}
exports.queryAllMedia = queryAllMedia;
// -- builder of query main content url lang
const queryHomeLandings = function seoBuilder(table, lang) {

  var query = 'SELECT  ' +
    'andromedeetpersee.' + table + '.id_' + table + ' as id_house, ' +
    'andromedeetpersee.' + table + '_landing.id_' + table + '_landing as id_landing, ' +
    'andromedeetpersee.' + table + '_landing_lang.title, ' +
    'andromedeetpersee.' + table + '_landing_lang.location, ' +
    'andromedeetpersee.' + table + '_landing_lang.description as content, ' +
    'andromedeetpersee.' + table + '_lang.url' +
    ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang, andromedeetpersee.' + table + '_landing, andromedeetpersee.' + table + '_landing_lang'
    + ' WHERE andromedeetpersee.' + table + '_landing.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_landing.id_' + table + '_landing = andromedeetpersee.' + table + '_landing_lang.id_' + table + '_landing' +
    ' AND andromedeetpersee.' + table + '_landing.is_home = 1' +
    ' AND andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_landing_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '.online = 1 and andromedeetpersee.' + table + '.publish_on<=' + mysql.escape(moment().format("YYYY-MM-DD HH:ss:mm")) + '' +
    '';

  return query;
}
exports.queryHomeLandings = queryHomeLandings;


const querySelectionHome = function querySelectionHome(table, lang) {
  var query = 'SELECT  ' +
    'andromedeetpersee.' + table + '.id_' + table + ' as id, ' +
    'andromedeetpersee.' + table + '_landing.id_' + table + '_landing as id_landing, ' +
    'andromedeetpersee.' + table + '_lang.title, ' +
    'andromedeetpersee.' + table + '_lang.description as content, ' +
    'andromedeetpersee.' + table + '_lang.url,' +
    'andromedeetpersee.' + table + '_config.price,' +
    'andromedeetpersee.' + table + '_config.quantity' +
    ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang, andromedeetpersee.' + table + '_landing,andromedeetpersee.' + table + '_config';

  query += ' WHERE andromedeetpersee.' + table + '_landing.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_config.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_landing.online = 1 ' +
    ' AND andromedeetpersee.' + table + '_landing.is_home = 1 ' +
    ' ORDER BY  andromedeetpersee.' + table + '_landing.position ';
  return query;
}
exports.querySelectionHome = querySelectionHome;
const querySelectionSameCollectionOther = function querySelectionSameCollectionOther(table, lang, idProduct) {
  var query = 'SELECT  ' +
    'andromedeetpersee.' + table + '.id_' + table + ' as id, ' +
    'andromedeetpersee.' + table + '_landing.id_' + table + '_landing as id_landing, ' +
    'andromedeetpersee.' + table + '_lang.title, ' +
    'andromedeetpersee.' + table + '_lang.description as content, ' +
    'andromedeetpersee.' + table + '_lang.url,' +
    'andromedeetpersee.' + table + '_config.price,' +
    'andromedeetpersee.' + table + '_config.quantity' +
    ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang, andromedeetpersee.' + table + '_landing,andromedeetpersee.' + table + '_config, andromedeetpersee.collection_product';

  query += ' WHERE andromedeetpersee.' + table + '_landing.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_config.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '.id_' + table + '= collection_product.id_product' +
    ' AND andromedeetpersee.collection_product.id_product !=  ' + idProduct +
    ' ORDER BY  andromedeetpersee.' + table + '_landing.position ';
  return query;
}
exports.querySelectionSameCollectionOther = querySelectionSameCollectionOther;


const queryCollectionHome = function queryCollectionHome(table, lang) {
  var query = 'SELECT  ' +
    'andromedeetpersee.' + table + '.id_' + table + ' as id, ' +
    'andromedeetpersee.' + table + '_landing.id_' + table + '_landing as id_landing, ' +
    'andromedeetpersee.' + table + '_landing_lang.title, ' +
    'andromedeetpersee.' + table + '_landing_lang.description as content, ' +
    'andromedeetpersee.' + table + '_landing_lang.url' +
    ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang, andromedeetpersee.' + table + '_landing, andromedeetpersee.' + table + '_landing_lang';

  query += ' WHERE andromedeetpersee.' + table + '_landing.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_landing_lang.id_' + table + '_landing = andromedeetpersee.' + table + '_landing.id_' + table + '_landing' +
    ' AND andromedeetpersee.' + table + '_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_landing_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_landing.online = 1 ' +
    ' AND andromedeetpersee.' + table + '_landing.is_home = 1 ' +
    ' ORDER BY  andromedeetpersee.' + table + '_landing.position ';
  return query;
}
exports.queryCollectionHome = queryCollectionHome;

const queryCollectionShopById = function queryCollectionShopById(table, lang, idCollection) {
  var query = 'SELECT  ' +
    'andromedeetpersee.' + table + '.id_' + table + ' as id, ' +
    'andromedeetpersee.' + table + '_lang.title, ' +
    'andromedeetpersee.' + table + '_lang.description as content, ' +
    'andromedeetpersee.' + table + '_lang.url' +
    ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang, andromedeetpersee.' + table + '_landing ';

  query += ' WHERE andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '.id_collection =  ' + idCollection;
  return query;
}
exports.queryCollectionShopById = queryCollectionShopById;

const queryAllMediaLanding = function sectionMediaBuilder(table, lang, idSection) {

  var query = 'SELECT andromedeetpersee.' + table + '_media_lang.id_media, path,base_path, file_name, height, width, type,title,alt' +
    ' FROM andromedeetpersee.' + table + '_media_lang, andromedeetpersee.' + table + '_media ' +
    ' WHERE andromedeetpersee.' + table + '_media_lang.id_media = andromedeetpersee.' + table + '_media.id_media' +
    ' AND andromedeetpersee.' + table + '_media_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_media.id_' + table + ' = ' + idSection + '' +
    ' ';

  return query;
}
exports.queryAllMediaLanding = queryAllMediaLanding;
const executeAsynSectionMedia = function fct(connection, query, data, next) {

  connection.query(query,
    function fctSectionMedia(errorSecM, homeSectionsMedia) {
      if (errorSecM) {
        console.log(errorSecM);
        return errorSec;
      }
      data.media = homeSectionsMedia;
      next(data);
    });
}
exports.executeAsynSectionMedia = executeAsynSectionMedia;


const executeAsynServicesMedia = function fct(connection, query, data, next) {

  connection.query(query,
    function fctSectionMedia(errorSecM, homeSectionsMedia) {
      if (errorSecM) {
        console.log(errorSecM);
        return errorSec;
      }
      data.media = homeSectionsMedia;
      next(data);
    });
}
exports.executeAsynServicesMedia = executeAsynServicesMedia;

const executeAsynGetMedia = function fct(connection, query, data, next) {

  connection.query(query,
    function fctSectionMedia(errorSecM, media) {
      if (errorSecM) {
        console.log(errorSecM);
        return errorSecM;
      }
      data.media = media;
      next(data);
    });
}
exports.executeAsynGetMedia = executeAsynGetMedia;

const queryCollectionForProduct = function queryCollectionForProduct(table, lang, idProduct) {
  var query = 'SELECT  ' +
    'andromedeetpersee.' + table + '.id_' + table + ' as id, ' +
    'andromedeetpersee.' + table + '_landing.id_' + table + '_landing as id_landing, ' +
    'andromedeetpersee.' + table + '_lang.title, ' +
    'andromedeetpersee.' + table + '_lang.description as content, ' +
    'andromedeetpersee.' + table + '_landing_lang.url' +
    ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang, andromedeetpersee.' + table + '_landing, andromedeetpersee.' + table + '_landing_lang,andromedeetpersee.' + table + '_product ';

  query += ' WHERE andromedeetpersee.' + table + '_landing.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_product.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_landing_lang.id_' + table + '_landing = andromedeetpersee.' + table + '_landing.id_' + table + '_landing' +
    ' AND andromedeetpersee.' + table + '_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_product.id_product =' + idProduct +
    ' AND andromedeetpersee.' + table + '_landing_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '_landing.online = 1 ' +
    ' AND andromedeetpersee.' + table + '_landing.is_home = 1 ' +
    ' ORDER BY  andromedeetpersee.' + table + '_landing.position ';

  return query;
}
exports.queryCollectionForProduct = queryCollectionForProduct;

const querySelectionSameCollection = function querySelectionSameCollection(table, lang, idCollection) {
  var query = 'SELECT  ' +
    'andromedeetpersee.' + table + '.id_' + table + ' as id, ' +
    'andromedeetpersee.' + table + '_landing.id_' + table + '_landing as id_landing, ' +
    'andromedeetpersee.' + table + '_lang.title, ' +
    'andromedeetpersee.' + table + '_lang.description as content, ' +
    'andromedeetpersee.' + table + '_lang.url,' +
    'andromedeetpersee.' + table + '_config.price,' +
    'andromedeetpersee.' + table + '_config.quantity' +
    ' FROM andromedeetpersee.' + table + ', andromedeetpersee.' + table + '_lang, andromedeetpersee.' + table + '_landing,andromedeetpersee.' + table + '_config, andromedeetpersee.collection_product';

  query += ' WHERE andromedeetpersee.' + table + '_landing.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_config.id_' + table + ' = andromedeetpersee.' + table + '.id_' + table + '' +
    ' AND andromedeetpersee.' + table + '_lang.lang = ' + mysql.escape(lang) + ' ' +
    ' AND andromedeetpersee.' + table + '.id_' + table + '= collection_product.id_product' +
    ' AND andromedeetpersee.collection_product.id_collection =  ' + idCollection +
    ' ORDER BY  andromedeetpersee.' + table + '_landing.position ';
  return query;
}
exports.querySelectionSameCollection = querySelectionSameCollection;