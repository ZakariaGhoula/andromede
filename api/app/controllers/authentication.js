const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
// Generate JWT
const async = require('async');
const mysql = require('mysql');
const moment = require('moment');
const config = require('../config/main');
const connection = require('./../connection');

// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds 7 days
  });
}

var capitalize = function capitalize(s) {
  // returns the first letter capitalized + the string from index 1 and out aka. the rest of the string
  return s[0].toUpperCase() + s.substr(1);
}

function generateHash(password, next) {

  const SALT_FACTOR = 5;
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) return next(err);
      return next(hash);
    });
  });
}

function comparePassword(candidatePassword, password, bool, cb) {
  bcrypt.compare(candidatePassword, password, (err, isMatch) => {
    if (err) {
      return cb(err, true);
    }
    cb(null, isMatch ? false : true);
  });
}

function comparePasswordUpdate(candidatePassword, password, bool, cb) {
  bcrypt.compare(candidatePassword, password, (err, isMatch) => {
    if (err) {
      return cb(err, false);
    }
    cb(null, isMatch ? true : false);
  });
}


//= =======================================
// Registration Route
//= =======================================
exports.register = function fctRegister(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;
  const address2 = req.body.address2;
  const zipcode = req.body.zipcode;
  const city = req.body.city;
  const country = req.body.country;
  const province = req.body.province;
  const optin = req.body.optin;

  var hash = '';
  var exist = false;
  var idUser = '';
  var idAddress = '';
  // Return error if no email provided
  if (!email) {
    return res.status(422).send({error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({error: 'You must enter a password.'});
  }

  // ----
  async.series([

    // chech if exist
    function (callback1) {
      const checksql = 'SELECT * FROM customer where email =  ' + mysql.escape(email) + '';
      connection.query(checksql, function (error, customer) {
        if (error) {
          return res.status(500).send({error: error});
        }
        if (customer.length > 0) {
          exist = true;
        }
        callback1();
      });

    }, // hash password
    function (callback1) {
      if (!exist) {
        generateHash(password, function (data) {
          hash = data;
          callback1();
        });
      } else {
        callback1();
      }
    },  // save customer
    function (callback1) {
      if (!exist) {
        const request = ' INSERT into customer (email,password,first_name,last_name,phone,created,updated,optin)  VALUES (' +
          '' + mysql.escape(email) + ',' +
          '' + mysql.escape(hash) + ',' +
          '' + mysql.escape(firstName) + ',' +
          '' + mysql.escape(lastName) + ',' +
          '' + mysql.escape(phone) + ',' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '",' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '",' +
          '' + optin + '' +
          ')';
        connection.query(request, function (error, customer) {
          if (error) {
            return res.status(500).send({error: error});
          }
          idUser = customer.insertId;
          callback1();
        });
      } else {
        callback1();
      }

    }, function (callback1) {
      if (!exist) {
        const request = ' INSERT into customer_address (id_customer,first_name,last_name,address,address_2,zipcode,city,country,province)  VALUES (' +
          '' + (idUser) + ',' +
          '' + mysql.escape(firstName) + ',' +
          '' + mysql.escape(lastName) + ',' +
          '' + mysql.escape(address) + ',' +
          '' + mysql.escape(address2) + ',' +
          '' + mysql.escape(zipcode) + ',' +
          '' + mysql.escape(city) + ',' +
          '' + mysql.escape(country) + ',' +
          '' + mysql.escape(province) + '' +
          ')';
        connection.query(request, function (error, address) {
          if (error) {
            return res.status(500).send({error: error});
          }
          idAddress = address.insertId;
          callback1();
        });
      } else {
        callback1();
      }

    }
  ], function fct() {
    if (exist) {
      return res.status(403).send({exist: true});
    } else {

      const userInfo = {
        id: idUser,
        profile: {
          firstName: capitalize(firstName),
          lastName: capitalize(lastName),
          phone: phone,
          phone2: '',
        }, addresses: [
          {
            id_customer_address: idAddress,
            last_name: firstName,
            first_name: lastName,
            address: address,
            address_2: address2,
            zipcode: zipcode,
            city: city,
            country: country,
            province: province,
          }
        ],
        email: email,
        role: 'customer'
      };

      return res.status(200).send({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    }
  });
}
//= =======================================
// LOGIN Route
//= =======================================
exports.login = function fctRegister(req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;

  var hash = '';
  var exist = false;
  var wrongPassword = false;
  var customerTmp = null;
  var idUser = '';
  var address = [];
  // Return error if no email provided
  if (!email) {
    return res.status(422).send({error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({error: 'You must enter a password.'});
  }

  /// ----
  async.series([

    // chech if exist
    function (callback1) {
      const checksql = 'SELECT * FROM customer where email =  ' + mysql.escape(email) + ' and active=1';
      connection.query(checksql, function (error, customer) {
        if (error) {
          return res.status(500).send({error: error});
        }
        if (customer && customer.length > 0) {
          exist = true;
          customerTmp = customer[0];
        }
        callback1();
      });

    }, // hash password
    function (callback1) {
      if (exist) {
        comparePassword(password, customerTmp.password, wrongPassword, function fct(err, data) {
          wrongPassword = data;
          callback1();
        });
      } else {
        callback1();
      }
    }, // hash password
    function (callback1) {
      if (exist) {
        const sqlAdress = 'SELECT * FROM customer_address where id_customer =  ' + (customerTmp.id) + '';
        connection.query(sqlAdress, function (error, addr) {
          if (error) {

          }
          if (addr && addr.length > 0) {
            address = addr;
          }
          callback1();
        });
      } else {
        callback1();
      }
    },
  ], function fct() {
    if (!exist) {
      return res.status(403).send({exist: false, wrongPassword: true});
    } else {
      if (wrongPassword) {
        return res.status(403).send({exist: true, wrongPassword: true});
      }

      const userInfo = {
        id: customerTmp.id,
        profile: {
          firstName: capitalize(customerTmp.first_name),
          lastName: capitalize(customerTmp.last_name),
          phone: customerTmp.phone,
          phone2: customerTmp.phone2,
        }, addresses: address,
        email: email,
        role: 'customer'
      };

      return res.status(200).send({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    }
  });
}


//= =======================================
// Authorization Middleware
//= =======================================
/*
// Role authorization check
exports.roleAuthorization = function (requiredRole) {
    return function (req, res, next) {
        const user = req.user;

        User.findById(user._id, (err, foundUser) => {
            if (err) {
                res.status(422).json({error: 'No user was found.'});
                return next(err);
            }

            // If user is found, check role.
            if (getRole(foundUser.role) >= getRole(requiredRole)) {
                return next();
            }

            return res.status(401).json({error: 'You are not authorized to view this content.'});
        });
    };
};
 */


//= =======================================
// Update Personnal Data
//= =======================================
exports.updatePersonnalData = function fctRegister(req, res, next) {
  // Check for registration errors
  const idUser = req.body.id_user;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  var hash = '';
  var exist = false;
  var wrongPassword = null;
  var finalCustomer = null;
  var finalAddress = null;
  // Return error if no email provided
  if (!email) {
    return res.status(422).send({error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({error: 'You must enter your full name.'});
  }
  // ----
  async.series([
    function (callback1) {
      const request = ' UPDATE customer ' +
        'set email = ' + mysql.escape(email) + ',' +
        'first_name=' + mysql.escape(firstName) + ',' +
        'last_name=' + mysql.escape(lastName) + ',' +
        'phone=' + mysql.escape(phone) + ',' +
        'updated=' + mysql.escape(moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '' +
        ' WHERE id=' + idUser;
      connection.query(request, function (error, customer) {
        if (error) {
          return res.status(500).send({error: error});
        }
        callback1();
      });
    },
    // retrieve all data user
    function (callback1) {
      const checksql = 'SELECT * FROM customer where id =  ' + idUser + '';
      connection.query(checksql, function (error, customer) {
        if (error) {
          return res.status(500).send({error: error});
        }
        if (customer.length > 0) {
          exist = true;
          finalCustomer = customer[0];
        }
        callback1();
      });
    },
    // retrieve all address user
    function (callback1) {
      const checksql = 'SELECT * FROM customer_address where id_customer =  ' + idUser + '';
      connection.query(checksql, function (error, customerAdd) {
        if (error) {
          return res.status(500).send({error: error});
        }
        if (customerAdd.length > 0) {
          finalAddress = customerAdd;
        }
        callback1();
      });
    }
  ], function fct() {
    if (!exist) {
      return res.status(403).send({error: 'no found'});
    } else {
      const userInfo = {
        id: idUser,
        profile: {
          firstName: capitalize(finalCustomer.first_name),
          lastName: capitalize(finalCustomer.last_name),
          phone: finalCustomer.phone,
          phone2: finalCustomer.phone_2,
        }, addresses: finalAddress,
        email: finalCustomer.email,
        role: 'customer'
      };

      return res.status(200).send({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    }
  });
}


//= =======================================
// Update address Data
//= =======================================
exports.updateAddress = function fctRegister(req, res, next) {
  // Check for registration errors
  const idUser = req.body.id_user;
  const idCustomerAddress = req.body.id_address;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const address2 = req.body.address2;
  const city = req.body.city;
  const zipcode = req.body.zipcode;
  const state = req.body.state;
  const country = req.body.country;
  var hash = '';
  var exist = false;
  var finalCustomer = null;
  var finalAddress = null;
  // Return error if no email provided


  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({error: 'You must enter your full name.'});
  }
  // ----
  async.series([
    function (callback1) {
      const request = ' UPDATE customer_address ' +
        'set ' +
        'first_name=' + mysql.escape(firstName) + ',' +
        'last_name=' + mysql.escape(lastName) + ',' +
        'address=' + mysql.escape(address) + ',' +
        'address_2=' + mysql.escape(address2) + ',' +
        'city=' + mysql.escape(city) + ',' +
        'zipcode=' + mysql.escape(zipcode) + ',' +
        'province=' + mysql.escape(state) + ',' +
        'country=' + mysql.escape(country) + '' +
        ' WHERE id_customer_address=' + idCustomerAddress;
      connection.query(request, function (error, customer) {
        if (error) {
          console.log(error);
          return res.status(500).send({error: error});
        }
        callback1();
      });
    },
    // retrieve all data user
    function (callback1) {
      const checksql = 'SELECT * FROM customer where id =  ' + idUser + '';
      connection.query(checksql, function (error, customer) {
        if (error) {
          return res.status(500).send({error: error});
        }
        if (customer.length > 0) {
          exist = true;
          finalCustomer = customer[0];
        }
        callback1();
      });
    },
    // retrieve all address user
    function (callback1) {
      const checksql = 'SELECT * FROM customer_address where id_customer =  ' + idUser + '';
      connection.query(checksql, function (error, customerAdd) {
        if (error) {
          return res.status(500).send({error: error});
        }
        if (customerAdd.length > 0) {
          finalAddress = customerAdd;
        }
        callback1();
      });
    }
  ], function fct() {
    if (!exist) {
      return res.status(403).send({error: 'no found'});
    } else {
      const userInfo = {
        id: idUser,
        profile: {
          firstName: capitalize(finalCustomer.first_name),
          lastName: capitalize(finalCustomer.last_name),
          phone: finalCustomer.phone,
          phone2: finalCustomer.phone_2,
        }, addresses: finalAddress,
        email: finalCustomer.email,
        role: 'customer'
      };

      return res.status(200).send({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    }
  });
}

//= =======================================
// Update Personnal Data
//= =======================================
exports.updatePwd = function fctRegister(req, res, next) {
  // Check for registration errors
  const idUser = req.body.id_user;
  const oldPassword = req.body.oldPassword;
  const password = req.body.password;
  var hash = '';
  var exist = false;
  var finalCustomer = null;
  var customerTmp = null;
  var finalAddress = null;
  var wrongPassword = null;
  // Return error if no email provided
  if (!oldPassword) {
    return res.status(422).send({error: 'You must enter an oldPassword.'});
  }
  // Return error if full name not provided
  if (!password) {
    return res.status(422).send({error: 'You must enter your new password.'});
  }
  // ----
  async.series([
    function (callback1) {
      const checksql = 'SELECT * FROM customer where id =  ' + (idUser) + ' and active=1';
      connection.query(checksql, function (error, customer) {
        if (error) {
          return res.status(500).send({error: error});
        }
        if (customer && customer.length > 0) {
          exist = true;
          customerTmp = customer[0];
        }
        callback1();
      });

    }, function (callback1) {
      if (exist) {
        comparePasswordUpdate(oldPassword, customerTmp.password, wrongPassword, function fct(err, data) {
          wrongPassword = data;
          callback1();
        });
      } else {
        callback1();
      }
    },
    function (callback1) {
      if (wrongPassword) {
        generateHash(password, function (data) {
          hash = data;
          callback1();
        });
      } else {
        callback1();
      }
    },
    // update customer
    function (callback1) {
      if (wrongPassword) {
        const request = ' UPDATE customer ' +
          'set password = ' + mysql.escape(hash) + ',' +
          'updated=' + mysql.escape(moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '' +
          ' WHERE id=' + idUser;
        connection.query(request, function (error, customer) {
          if (error) {
            return res.status(500).send({error: error});
          }
          callback1();
        });
      } else {
        callback1();
      }
    },
    // retrieve all data user
    function (callback1) {
      if (wrongPassword) {
        const checksql = 'SELECT * FROM customer where id =  ' + idUser + '';
        connection.query(checksql, function (error, customer) {
          if (error) {
            return res.status(500).send({error: error});
          }
          if (customer.length > 0) {
            exist = true;
            finalCustomer = customer[0];
          }
          callback1();
        });
      } else {
        callback1();
      }
    },
    // retrieve all address user
    function (callback1) {
      if (wrongPassword) {
        const checksql = 'SELECT * FROM customer_address where id_customer =  ' + idUser + '';
        connection.query(checksql, function (error, customerAdd) {
          if (error) {
            return res.status(500).send({error: error});
          }
          if (customerAdd.length > 0) {
            finalAddress = customerAdd;
          }
          callback1();
        });
      } else {
        callback1();
      }
    }
  ], function fct() {
    if (!wrongPassword) {
      return res.status(403).send({error: 'no found'});
    } else {
      const userInfo = {
        id: idUser,
        profile: {
          firstName: capitalize(finalCustomer.first_name),
          lastName: capitalize(finalCustomer.last_name),
          phone: finalCustomer.phone,
          phone2: finalCustomer.phone_2,
        }, addresses: finalAddress,
        email: finalCustomer.email,
        role: 'customer'
      };

      return res.status(200).send({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    }
  });
}

//= =======================================
// Update Personnal Data
//= =======================================
exports.retreiveOrder = function fctRegister(req, res, next) {
  // Check for registration errors


  // ----
  const sql = "SELECT * FROM andromedeetpersee.billing where payed = 1 and id_customer=" + req.user.id + " order by date_payment desc";
  connection.query(sql, function (error, data) {
    if (error) {
      return res.status(500).send({error: error});
    }
    return res.status(200).send({

      invoices: data
    });
  });
}