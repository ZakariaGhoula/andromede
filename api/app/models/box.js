'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BoxSchema = mongoose.Schema({

  type:String,
  media: {type: Object, default: null},
  texte: {type: String, default: null},
  locale: String,
  online: {type: Boolean, default: true},
});

module.exports = mongoose.model('textboxes', BoxSchema);