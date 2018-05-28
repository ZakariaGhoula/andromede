'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var HomeSliderSchema = mongoose.Schema({

  title: String,
  description: String,
  url: String,
  position: Number,
  media: Object,
  online: {type: Boolean, default: false},
  time: String
});

module.exports = mongoose.model('home_slider', HomeSliderSchema);