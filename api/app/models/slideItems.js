'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var media = require('./media');

var SlideItemsSchema = mongoose.Schema({

  media: Object,
  title: String,
  sub_title:String,
  description: String,
  locale: String,
  online: {type: Boolean, default: true},
});

module.exports = mongoose.model('homeslide1', HomeSlide1Schema);