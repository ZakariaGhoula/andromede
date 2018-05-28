'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PagesSchema = mongoose.Schema({

  title: String,
  url: String,
  rubrique: String,
  metas: Object,
  online: {type: Boolean, default: false},
  date_updated: String,
  list_bloc: Array,
});

module.exports = mongoose.model('page', PagesSchema);