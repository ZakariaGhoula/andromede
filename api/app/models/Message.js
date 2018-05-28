'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = mongoose.Schema({

    conversationID: String,
    userId: Schema.Types.ObjectId,
    content: Object,
    text: String,
    read: {type: Boolean, default: false},
    time: String
});

module.exports = mongoose.model('Message', messageSchema);