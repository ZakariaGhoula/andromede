'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var box = require('./box');

var CommandezSchema = mongoose.Schema({

  title: {type: String, default: null},
  description: String,
  subtitle: String,
  media: {type: Object, default: null},
  locale: String,
  online: {type: Boolean, default: true},
  url: {type: String, default: null},
  idProduct: Number,
  price: Number
});

module.exports = mongoose.model('command', CommandezSchema);