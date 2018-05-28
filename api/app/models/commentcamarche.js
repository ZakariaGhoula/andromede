'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var box = require('./box');

var CommentCaMarcheSchema = mongoose.Schema({

  media: {type: Object, default: null},
  title: {type: String, default: null},
  texteBox:Object,
  locale: String,
  online: {type: Boolean, default: true},
});

module.exports = mongoose.model('howitworks', CommentCaMarcheSchema);