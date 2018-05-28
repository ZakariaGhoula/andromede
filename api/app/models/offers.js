'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OffersSchema = mongoose.Schema({

  title: String,
  content: String,
  url: String,
  agenceId: String,
  media: Object,
  online: {type: Boolean, default: false},
  isHome: {type: Boolean, default: false},
  date_online: String,
  date_offline: String,
  params: Object,
  presentation: Object,
  home: Object,
});

module.exports = mongoose.model('offer', OffersSchema);