const HomeController = require('./controllers/home');
const ProductController = require('./controllers/product');
const ShopController = require('./controllers/shop');
const OthersController = require('./controllers/others');
const AuthenticationController = require('./controllers/authentication');
const CheckoutController = require('./controllers/checkout');
/* ------ gestop, admin */
const express = require('express');

const passport = require('passport');
// const passportService = require('./config/passport');

const passportService = require('./config/passport');
// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
// const requireLogin = passport.authenticate('local', {session: false});

module.exports = function fct(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router();

  //= ========================
  // Auth Routes
  //= ========================
  apiRoutes.use('/auth', authRoutes);
  // Registration route
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', AuthenticationController.login);
  authRoutes.post('/update-data-perso', requireAuth, AuthenticationController.updatePersonnalData);
  authRoutes.post('/update-address', requireAuth, AuthenticationController.updateAddress);
  authRoutes.post('/update-password', requireAuth, AuthenticationController.updatePwd);
  authRoutes.get('/retrieve-list-orders', requireAuth, AuthenticationController.retreiveOrder);
  // Liens HOME
  apiRoutes.get('/home/:lng', HomeController.retrieveDataHome);
  // Liens products
  apiRoutes.get('/product/:lng/:url', ProductController.retrieveDataByUrl);
  // Liens country
  apiRoutes.get('/others/countries/:lng', OthersController.retrieveCountryList);
  // Liens products
  apiRoutes.get('/shop/:lng/:idCollection', ShopController.retrieveDataByCollection);
  // Liens products
  apiRoutes.post('/checkout/placeorder', requireAuth, CheckoutController.placeOrder);
  // Set url for API group routes
  app.use('/v1', apiRoutes);
};
