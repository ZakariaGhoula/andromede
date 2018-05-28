var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// fonction qui appel la fonction d'insertion d'event dans le calendrier (passage par l'authentification)
var addEvents = function(dataInsert, next) {
    // Load client secrets from a local file.
    fs.readFile('./app/config/client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), insertEvents, dataInsert, next);
    });
};

exports.addEvents = addEvents;

// fonction qui appel la fonction de listage d'event sur un calendrier (passage par l'authentification)
var listAllEventsFromCalendar = function(dataInsert, next) {
    // Load client secrets from a local file.
    fs.readFile('./app/config/client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), listEvents, dataInsert, next);
    });
};

exports.listAllEventsFromCalendar = listAllEventsFromCalendar;

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, dataInsert, next) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client, dataInsert, next);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */



// fonction d'insertion d'event dans le calendrier
var insertEvents = function(auth, dataInsert, next) {
    var calendar = google.calendar('v3');
    calendar.events.insert({
        auth: auth,
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
}

exports.insertEvents = insertEvents;

// fonction qui génere une liste des 10 derniers event d'un calendrier (passage par l'authentification)
var listEvents = function(auth, dataInsert, next) {

    var calendar = google.calendar('v3');
    calendar.events.list({
        auth: auth,
        calendarId: dataInsert,
        timeMin: (new Date()).toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var events = response.items;
        if (events.length === 0) {
            console.log('No upcoming events found.');
        } else {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
                return next(response);
            }
        }
    });
}

exports.listEvents = listEvents;

