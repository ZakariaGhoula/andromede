'use strict';

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NotificationSchema = mongoose.Schema({

    userId: Schema.Types.ObjectId,
    toUserId: Schema.Types.ObjectId,
    content: Object,
    read: {type: Boolean, default: false},
    time: String
});

module.exports = mongoose.model('notification', NotificationSchema);