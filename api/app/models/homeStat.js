'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var HomeStatSchema = mongoose.Schema({

  title: String,
  count: String,
  position: Number,
  media: Object,
  online: {type: Boolean, default: false},
  time: String
});

module.exports = mongoose.model('home_stat', HomeStatSchema);