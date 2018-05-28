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
const retrieveCountryList = function fct(req, res) {
  var finalData = {};
  // 1 -- retrieve lng
  var lang = req.params.lng;
  // 2 -- check if params exists.
  if (!lang || !tools.arrayContains(LANG, lang)) {
    lang = DEFAULT_LANG;
  }
  finalData = {
    'univers': 'others',
    'lang': lang,
    'alt_lang': (lang === DEFAULT_LANG) ? 'en' : DEFAULT_LANG,

  }
  const tableToAsk = (lang === DEFAULT_LANG) ? 'countries_fr' : 'countries_en';
  const sql = 'SELECT * FROM ' + tableToAsk + '';
  connection.query(sql, function (error, finalData2) {
    if (error) {
      return res.status(500).send({error: error});
    }
    finalData['data'] = finalData2;
    return res.status(200).json(finalData);

  });

}

exports.retrieveCountryList = retrieveCountryList;