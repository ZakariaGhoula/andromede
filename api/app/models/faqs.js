'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FaqsSchema = mongoose.Schema({

  question: String,
  reponse: String,
  position: Number,
  locale: String,
  online: {type: Boolean, default: true},
});

module.exports = mongoose.model('faq', FaqsSchema);