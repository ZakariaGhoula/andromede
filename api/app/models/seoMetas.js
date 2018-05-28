'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SeoMetasSchema = mongoose.Schema({

  title: String,
  description: String,
  slug: String,
  urlCanonical: String,
  media: Object,
  followed: Boolean,
  indexed: Boolean
});

module.exports = mongoose.model('seo_meta', SeoMetasSchema);