/// Importing Node modules and initializing Express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  router = require('./app/router'),
  config = require('./app/config/main');

// Start the server
var server = app.listen(config.port, function () {
  console.log(`Your server is running on port ${config.port}.`);
});


// Set static file location for production
app.use(express.static(__dirname + '/public'));


// Setting up basic middleware for all Express requests

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
//app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use((req, res, next) => {

  var allowedOrigins = ['undefined', 'http://127.0.0.1:3000', 'http://127.0.0.1:3030', 'http://127.0.0.1:3001', 'http://localhost:3000', 'http://localhost:3030', 'http://localhost:3001'];
  var origin = req.headers.origin;


  if (allowedOrigins.indexOf(origin) > -1 || allowedOrigins.indexOf(req.headers.host) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  //res.header('Access-Control-Allow-Origin', 'http://backend.pierresdhistoire.com');

  //res.header('Access-Control-Allow-Origin', 'http://localhost:3050');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');

  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Appengine-Cron', true);
  next();
});

// Import routes to be served
router(app);

// necessary for testing
module.exports = server;