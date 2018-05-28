'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MediaSchema = mongoose.Schema({

  url: String,
  title: String,
  alt: String,
  online: {type: Boolean, default: true},
  height: Number,
  width: Number
});

module.exports = mongoose.model('media', MediaSchema);