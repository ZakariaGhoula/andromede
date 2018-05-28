'use strict';

var mongoose = require('mongoose');
// var media = require('./media');

var HomeSchema = mongoose.Schema(
  {
    type: String,
    media: {type: Object, default: null},
    title: {type: String, default: null},
    subtitle: {type: String, default: null},
    description : {type: String, default: null},
    position: Number,
    locale: String,
    online: {type: Boolean, default: true},
  }

);

module.exports = mongoose.model('home', HomeSchema);