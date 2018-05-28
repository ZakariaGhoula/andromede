'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var JedecouvreSchema = mongoose.Schema({

  type: String,
  title: {type: String, default: null},
  description: String,
  subtitle: String,
  prix: String,
  media:Object,
  caracteristiques: String,
  detail: String,
  decouvrez: String,
  locale: String,
  online: {type: Boolean, default: true},
});

module.exports = mongoose.model('discovers', JedecouvreSchema);