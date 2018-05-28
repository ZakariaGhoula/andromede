'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var box = require('./box');

var AproposSchema = mongoose.Schema({

  media: {type: Object, default: null},
  title: {type: String, default: null},
  chiffre: {type: String, default: null},
  locale: String,
  online: {type: Boolean, default: true},
});

module.exports = mongoose.model('about', AproposSchema);