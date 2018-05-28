'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FormQuestionSchema = mongoose.Schema({

  mailAdress: String,
  question: String,
  dateSend: String,
  locale: String
});

module.exports = mongoose.model('formquestion', FormQuestionSchema);