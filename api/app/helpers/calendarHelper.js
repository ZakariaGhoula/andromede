var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var moment = require('moment');
var calendarController = require('../controllers/calendar');
var key = require('./../config/gcloud-pdh-dev-key.json');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var calendar = google.calendar('v3');
var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  SCOPES, // an array of auth scopes
  null
);


// fonction qui appel la fonction de listage d'event sur un calendrier (passage par l'authentification)
var listAllEventsFromCalendar = function (dataInsert, next) {
  // Load client secrets from a local file.

  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    // Make an authorized request to list Drive files.
    calendar.events.list({
      auth: jwtClient,
      calendarId: dataInsert,
      timeMin: (new Date()).toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return next([]);
      }
      var events = response.items;
      if (typeof events !== 'undefined') {
        if (events.length === 0) {
          console.log('No upcoming events found.');
          return next([]);
        } else {
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var start = event.start.dateTime || event.start.date;
            return next(response);
          }
        }
      }
    });
  });
};

exports.listAllEventsFromCalendar = listAllEventsFromCalendar;

var addEvents = function (dataInsert, next) {

  jwtClient.authorize(function (err) {
    if (err) {
      console.log(err);
      return;
    }

    calendar.events.insert({
      auth: jwtClient,
      calendarId: dataInsert.calendar.id_calendar,
      resource: dataInsert.data,
    }, function (err, dataInsert) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', dataInsert.htmlLink);
      return next('ok');
    });
  });
}

exports.addEvents = addEvents;


var isBooked = function (data, res, next) {
  var isBooked = false;

  calendarController.listAllEvents(data, res, function getEvents(events) {
    tableDates(data.body.date_begin, data.body.date_end, function getTable(DateTable) {
      tableDatesEvents(events, function getTableEvents(DataEvents) {
        console.log(DataEvents);
        console.log(DateTable);
        for (var k = 0; k <= DataEvents.length - 1; k++) {
          for (var m = 0; m <= DateTable.length - 1; m++) {
            if (DataEvents[k] === DateTable[m]) {
              isBooked = true;
            }
          }
        }
        next(isBooked);
      });
    });
  });
}

exports.isBooked = isBooked;
var isBooked2 = function (dataEvents, start,end, next) {
  var isBooked = false;

    tableDates(start,end, function getTable(DateTable) {
      tableDatesEvents2(dataEvents, function getTableEvents(DataEvents) {
        console.log(DataEvents);
        console.log(DateTable);
        for (var k = 0; k <= DataEvents.length - 1; k++) {
          for (var m = 0; m <= DateTable.length - 1; m++) {
            if (DataEvents[k] === DateTable[m]) {
              isBooked = true;
            }
          }
        }
        next(isBooked);
      });
    });
}

exports.isBooked2 = isBooked2;

var tableDates = function createTab(dateStart, dateEnd, next) {
  var Days = [];
  var startResa = moment(dateStart, 'YYYY-MM-DD');
  var endResa = moment(dateEnd, 'YYYY-MM-DD');
  var diff = moment.duration(endResa.diff(startResa)).asDays();
  Days[0] = startResa.format('YYYY-MM-DD');
  for (var l = 1; l < diff; l++) {
    Days[l] = moment(Days[l - 1]).add(1, 'd').format('YYYY-MM-DD');
  }
  Days[diff] = endResa.format('YYYY-MM-DD');
  next(Days);
};

exports.tableDates = tableDates;

var tableDatesEvents = function createTab(events, next) {
  var DaysEvents = [];
  for (var i = 0; i <= events.items.length - 1; i++) {
    var start = moment(events.items[i].start.date);
    var end = moment(events.items[i].end.date);
    tableDates(start, end, function getTable(DateTable) {
      for (var j = 0; j < DateTable.length; j++) {
        DaysEvents.push(DateTable[j]);
      }
    });
  }
  next(DaysEvents);
};

exports.tableDatesEvents = tableDatesEvents;

var tableDatesEvents2 = function createTab(events, next) {
  var DaysEvents = [];
  for (var i = 0; i <= events.length - 1; i++) {
    console.log(events[i]);
    console.log('======');
    console.log('======');
    var start = moment(events[i].start.date);
    var end = moment(events[i].end.date);
    tableDates(start, end, function getTable(DateTable) {
      for (var j = 0; j < DateTable.length; j++) {
        DaysEvents.push(DateTable[j]);
      }
    });
  }
  next(DaysEvents);
};

exports.tableDatesEvents2 = tableDatesEvents2;
