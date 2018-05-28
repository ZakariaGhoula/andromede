'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewsStatSchema = mongoose.Schema({

  title: String,
  content: String,
  url: String,
  media: Object,
  metas: Object,
  online: {type: Boolean, default: false},
  is_home: {type: Boolean, default: false},
  date_online: String,
  date_offline: String,
  presentation: Object,
  home: Object,
});

module.exports = mongoose.model('new', NewsStatSchema);