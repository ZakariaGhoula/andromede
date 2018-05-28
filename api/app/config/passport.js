// Importing Passport, strategies, and config
const passport = require('passport'),
  config = require('./main'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const mysql = require('mysql');
const connection = require('./../connection');

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email'
};


// Setting JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret

  // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  if (typeof payload._doc !== "undefined" && typeof payload._doc.id !== "undefined") {
    const checksql = 'SELECT * FROM customer where id =  ' + mysql.escape(payload._doc.id) + ' and active=1';
    connection.query(checksql, function (error, customer) {
      if (error) {
        return done(null, false);
      }
      if (customer && customer.length > 0) {
        done(null, customer[0]);
      }
    });
  } else {
    const checksql = 'SELECT * FROM customer where id =  ' + mysql.escape(payload.id) + ' and active=1';
    connection.query(checksql, function (error, customer) {
      if (error) {
        return done(null, false);
      }
      if (customer && customer.length > 0) {
        done(null, customer[0]);
      }
    });
  }

});


passport.use(jwtLogin);