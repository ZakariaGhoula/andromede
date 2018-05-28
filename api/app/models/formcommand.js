'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FormCommandSchema = mongoose.Schema({

  infoClient: {
    company: {type: Boolean, default: null},
    companyName: {type: String, default: null},
    companySiret: {type: String, default: null},
    name: String,
    firstName: String,
    mail: String,
    phoneNumber: String,
    comment: {type: String, default: null},
  },
  infoProduct: {
    idProduct: Number,
    nameProduct: String,
    priceProduct: Number,
    totalPrice: Number,
  },
  infoHost: {
    hostName: {type: String , default: null},
    domainName: {type: String , default: null},
    hostId: {type: String , default: null},
    hostPassword: {type: String , default: null},
  },
  infoStatut: Array
    /*{
    dateStatut: String,
    statutId: String,
    codeStripe: {type: String , default: null},
    typeStripe: {type: String , default: null},
  }*/,
  stripeCustomerId: {type: String , default: null},
  dateCommand: String,
  locale: String,
});

module.exports = mongoose.model('formcommand', FormCommandSchema);