const connection = require('./../connection');
const tools = require('./../helpers/tools');
const DEFAULT_LANG = require('./../constants').DEFAULT_LANG;
const LANG = require('./../constants').LANG;
const async = require('async');

const mysql = require('mysql');
const moment = require('moment');
var _ = require('lodash');

// Identifiants Stripe
var stripe = require("stripe")(
  "sk_test_cIcd8HJ00yDn8vUfITqfbjK5"
);

// api_key pour mailgun
var api_key = 'key-a508037a5bbdc5159b5336223a54bf10';
// nom de domaine mailgun
var domain = 'cutsomer.andromedeetpersee.com';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var fs = require('fs');
var emailOrderTpl = fs.readFileSync('./../static/email/order.html', 'utf8');
var pdf = require('html-pdf');

var htmlHead = fs.readFileSync('./../static/facturation/facture_header.html', 'utf8');
var htmlTable1 = fs.readFileSync('./../static/facturation/table_1.html', 'utf8');
var htmlTable_row = fs.readFileSync('./../static/facturation/table_row.html', 'utf8');
var htmlTable_row_head = fs.readFileSync('./../static/facturation/table_row_head.html', 'utf8');
var htmlTable_row_footer = fs.readFileSync('./../static/facturation/table_row_footer.html', 'utf8');


const generateFactureNb = function generateFactureNb(idBilling) {
  return 'STR-AP-' + moment().format('Y') + '-' + idBilling;
}

// --- retrieve data by lng
const placeOrder = function fct(req, res) {
  var finalData = {};
  // 1 -- retrieve lng
  var lang = req.body.locale;
  // 2 -- check if params exists.
  if (!lang || !tools.arrayContains(LANG, lang)) {
    lang = DEFAULT_LANG;
  }

  if (!req.body.shipping) {
    return res.status(500).json({noShipping: true});
  }
  if (!req.body.billing) {
    return res.status(500).json({noBilling: true});
  }
  if (!req.body.card) {
    return res.status(500).json({noCard: true});
  }
  if (!req.body.cart) {
    return res.status(500).json({noCart: true});
  }
  finalData = {
    'univers': 'checkout',
    'lang': lang,
    'alt_lang': (lang === DEFAULT_LANG) ? 'en' : DEFAULT_LANG,
  };
  var idBilling = null;
  var idAddressShipping = null;
  var idAddressBilling = null;
  var idCustomerStripe = null;
  var idTransacStripe = null;
  var stripeError = false;
  var stripeErrorMSG = null;
  var finalBillingNB = null;
  var isInvoiceError = false;
  var mailSend = false;

  const shippingFees = req.body.cart.foreign_shipping ? 10 : 5;
  async.series([

    // creation de l'adresse de facturation si nouvelle
    function (callback1) {
      if (typeof req.body.billing !== 'undefined' && req.body.billing.isNew) {
        const request = ' INSERT into customer_address (id_customer,first_name,last_name,address,address_2,zipcode,city,country,province)  VALUES (' +
          '' + (req.user.id) + ',' +
          '' + mysql.escape(req.body.billing.first_name) + ',' +
          '' + mysql.escape(req.body.billing.last_name) + ',' +
          '' + mysql.escape(req.body.billing.address) + ',' +
          '' + mysql.escape(req.body.billing.address_2) + ',' +
          '' + mysql.escape(req.body.billing.zipcode) + ',' +
          '' + mysql.escape(req.body.billing.city) + ',' +
          '' + mysql.escape(req.body.billing.country) + ',' +
          '' + mysql.escape(req.body.billing.province) + '' +
          ')';
        connection.query(request, function (error, address) {
          if (error) {
            return res.status(500).send({error: error});
          }
          idAddressBilling = address.insertId;
          callback1();
        });
      } else {
        idAddressBilling = req.body.billing.id_customer_address;
        callback1();
      }
    },
    // creation de l'adresse de livraison si nouvelle
    function (callback1) {
      if (typeof req.body.shipping !== 'undefined' && req.body.shipping.isNew) {
        const request = ' INSERT into customer_address (id_customer,first_name,last_name,address,address_2,zipcode,city,country,province)  VALUES (' +
          '' + (req.user.id) + ',' +
          '' + mysql.escape(req.body.shipping.first_name) + ',' +
          '' + mysql.escape(req.body.shipping.last_name) + ',' +
          '' + mysql.escape(req.body.shipping.address) + ',' +
          '' + mysql.escape(req.body.shipping.address_2) + ',' +
          '' + mysql.escape(req.body.shipping.zipcode) + ',' +
          '' + mysql.escape(req.body.shipping.city) + ',' +
          '' + mysql.escape(req.body.shipping.country) + ',' +
          '' + mysql.escape(req.body.shipping.province) + '' +
          ')';
        connection.query(request, function (error, address) {
          if (error) {
            callback1();
          }
          idAddressShipping = address.insertId;
          callback1();
        });
      } else {
        idAddressShipping = req.body.shipping.id_customer_address;
        callback1();
      }
    },
    // creation de la facture
    function (callback1) {
      if (idAddressShipping !== null && idAddressBilling !== null) {
        const request = ' INSERT into billing (id_customer,locale,total_price,foreign_shipping,id_customer_address_billing,id_customer_address_shipping,payed,date_created)  VALUES (' +
          '' + (req.user.id) + ',' +
          '' + mysql.escape(lang) + ',' +
          '' + ((req.body.cart.total_price ? req.body.cart.total_price : 0)) + ',' +
          '' + ((typeof req.body.cart.foreign_shipping !== 'undefined' && req.body.cart.foreign_shipping) ? 1 : 0) + ',' +
          '' + (idAddressBilling) + ',' +
          '' + (idAddressShipping) + ',' +
          '' + (0) + ',' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '"' +
          ')';
        connection.query(request, function (error, billing) {
          if (error) {
            callback1();
          } else {
            idBilling = billing.insertId;
            finalBillingNB = generateFactureNb(idBilling);
            callback1();
          }
        });
      } else {
        callback1();
      }
    },
    // creation des lignes de  facture
    function (callback1) {
      if (idBilling !== null && typeof req.body.cart.items !== 'undefined' && req.body.cart.items.length > 0) {
        async.forEach(req.body.cart.items, function fct3(itemCart, callback) {
          const request = ' INSERT into billing_row (id_billing,id_product,price,quantity)  VALUES (' +
            '' + (idBilling) + ',' +
            '' + ((itemCart.id_product)) + ',' +
            '' + ((itemCart.price)) + ',' +
            '' + (itemCart.quantity) + '' +
            ')';
          connection.query(request, function (error, billingRow) {
            callback();
          });
        }, function (err) {
          if (err) {
            console.log(err);
          }
          callback1();
        });
      } else {
        callback1();
      }
    }, // get name product
    function (callback1) {
      if (idBilling !== null && typeof req.body.cart.items !== 'undefined' && req.body.cart.items.length > 0) {
        async.forEach(req.body.cart.items, function fct3(itemCart, callback) {
          const request = 'SELECT title FROM product_lang where id_product=' + ((itemCart.id_product)) + ' and lang = ' + mysql.escape(lang);
          connection.query(request, function (error, product) {
            if (product && product[0]) {
              itemCart['title'] = product[0].title;
            }
            callback();
          });
        }, function (err) {
          if (err) {
            console.log(err);
          }
          callback1();
        });
      } else {
        callback1();
      }
    },
    // creation de la facture history (ligne de creation)
    function (callback1) {
      if (idBilling !== null) {
        const request = ' INSERT into billing_history (id_billing,description,date_history)  VALUES (' +
          '' + (idBilling) + ',' +
          '"creation of the billing",' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '"' +
          ')';
        connection.query(request, function (error, billing) {
          if (error) {
            callback1();
          } else {
            callback1();
          }
        });
      } else {
        callback1();
      }
    },
    // stripe
    function (callback1) {
      if (idBilling !== null && req.body.card) {
        stripe.customers.create({
          source: req.body.card.token,
          email: req.user.email,
          metadata: {
            'first_name': req.user.first_name,
            'last_name': req.user.last_name,
            'phone': req.user.phone,
          },
        }).then(function fct2(customer) {
          // insertion dans la table resa_facture
          idCustomerStripe = customer.id;
          return stripe.charges.create({
            amount: req.body.cart.total_price * 100 + (shippingFees * 100),
            currency: 'eur',
            description: 'Payement Facture ' + finalBillingNB,
            customer: idCustomerStripe,
          });
        }).then(function (transac) {
          if (transac && transac.id) {
            idTransacStripe = transac.id;
          }
          callback1();
        }).catch(function (err) {
          //  console.log(err);
          stripeErrorMSG = err.message;
          stripeError = true;
          callback1();
        });
      }
    },
    // maj biling (stripe id)
    function (callback1) {
      if (!stripeError && idTransacStripe !== null) {
        const request = ' UPDATE billing' +
          ' SET payed=1, ' +
          ' date_payment= "' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '",' +
          ' strip_transaction="' + idTransacStripe + '",' +
          ' strip_customer="' + idCustomerStripe + '" ' +
          ' WHERE id_billing=' + idBilling;

        connection.query(request, function (error, billingUpdate) {
          if (error) {
            callback1();
          } else {
            callback1();
          }
        });
      } else {
        callback1();
      }
    },
    // maj biling history(stripe status)
    function (callback1) {
      if (!stripeError && idTransacStripe !== null) {
        var request = ' INSERT into billing_history (id_billing,description,date_history)  VALUES (' +
          '' + (idBilling) + ',' +
          '"payement successed",' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '"' +
          ')';
      } else {
        var request = ' INSERT into billing_history (id_billing,description,error,date_history)  VALUES (' +
          '' + (idBilling) + ',' +
          '' + mysql.escape(stripeErrorMSG) + ',' +
          '1,' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '"' +
          ')';
      }
      connection.query(request, function (error, billingUpdate) {
        if (error) {
          callback1();
        } else {
          callback1();
        }
      });
    },
    // generate invoice
    function (callback1) {
      if (!stripeError && idTransacStripe !== null) {
        var str = htmlHead.toString().replace('{#num_facture#}', finalBillingNB);
        str = str.replace('{#date_edition#}', moment().format('YYYY-MM-DD'));
        str = str.replace('{#client_name#}', req.user.last_name + ' ' + req.user.first_name);
        str = str.replace('{#client_email#}', req.user.email);
        str = str.replace('{#client_tel#}', req.user.phone);
        str = str + htmlTable_row_head;

        var TotalTTC = 0;
        for (var tab in req.body.cart.items) {
          var row = htmlTable_row.toString().replace('{#desc#}', req.body.cart.items[tab].title);
          row = row.toString().replace('{#quantity#}', req.body.cart.items[tab].quantity);
          row = row.toString().replace('{#priceHT#}', Math.round(req.body.cart.items[tab].price - (5.5 / 100 * req.body.cart.items[tab].price)));
          row = row.toString().replace('{#TVA#}', Math.round(5.5 / 100 * req.body.cart.items[tab].price));
          row = row.toString().replace('{#total#}', Math.round(req.body.cart.items[tab].price));
          str = str + row;
          TotalTTC = TotalTTC + req.body.cart.items[tab].price;
        }
        var row = htmlTable_row.toString().replace('{#desc#}', 'Frais de livraison');
        row = row.toString().replace('{#quantity#}', '----');
        row = row.toString().replace('{#priceHT#}', Math.round(shippingFees - (5.5 / 100 * shippingFees)));
        row = row.toString().replace('{#TVA#}', Math.round(5.5 / 100 * shippingFees));
        row = row.toString().replace('{#total#}', Math.round(shippingFees));
        str = str + row;
        TotalTTC += shippingFees;
        var footer = htmlTable_row_footer.toString().replace('{#priceTTC#}', TotalTTC);
        str = str + footer;
        pdf.create(str, {}).toFile('../static/invoices/' + finalBillingNB + '.pdf', function (err, res2) {
          if (err) {
            isInvoiceError = true;
            console.log(err);
          }
          callback1();
        });
      } else {
        callback1();
      }
    },// send email
    function (callback1) {
      if (!stripeError && !isInvoiceError && idTransacStripe !== null) {
        var template = emailOrderTpl.toString();
        var content = "<p style='margin-top: 40px'>Nous vous remercions pour l&rsquo;achat que vous avez effectu&eacute; au sein de la maison Androm&egrave;de et Pers&eacute;e et esp&eacute;rons que votre acquisition vous satisfera pleinement.</p>" +
          "<p>Cet email contient votre facture.</p>\n" +
          "<p><b>L'envoi de votre colis se fera sous dix jours.</b></p>\n" +
          "<p>Nous demeurons plus que jamais &agrave; votre disposition pour r&eacute;pondre &agrave; toute &eacute;ventuelle question &agrave; l'adresse suivante : <a href=\"mailto:contact@andromedeetpersee.com\">contact@andromedeetpersee.com</a>. Nous serons ravis d&rsquo;&eacute;changer avec vous.</p>\n" +
          "<p>&Agrave; tr&egrave;s bient&ocirc;t,</p>\n" +
          "<p>La maison Androm&egrave;de et Pers&eacute;e</p>";
        template = template.replace('{#content#}', content);
        template = template.replace('{#title#}', 'Merci');
        var mail = {
          from: 'customer@andromedeetpersee.com',
          to: 'zakaria.ghoula@gmail.com',
          bcc: 'contact@andromedeetpersee.com',
          subject: ((req.body.locale === 'en') ? 'Your order from Andromede et Pesée' : 'Votre commande Andromede et Pesée') + ' - ' + finalBillingNB,
          html: template,
          attachment: './../static/invoices/' + finalBillingNB + '.pdf'
        };
        mailgun.messages().send(mail, function (error, body) {
          if (error) {
            console.log(error);
          }
          mailSend = true;
          callback1();
        });
      } else {
        var mail = {
          from: 'customer@andromedeetpersee.com',
          to: 'contact@andromedeetpersee.com\'',
          bbc: 'zakaria.ghoula@gmail.com',
          subject: 'COMMANDE Andromede et Pesée' + ' - ' + finalBillingNB,
          text: 'ERREUR COMMANDE - VERIFIER STRIPE - CODE ERREUR',
        };
        mailgun.messages().send(mail, function (error, body) {
          callback1();
        });
      }

    },
    // maj biling history (sended email)
    function (callback1) {
      if (!stripeError && mailSend && idTransacStripe !== null) {
        var request = ' INSERT into billing_history (id_billing,description,date_history)  VALUES (' +
          '' + (idBilling) + ',' +
          '"Email + Invoice SEND",' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '"' +
          ')';
      } else {
        var request = ' INSERT into billing_history (id_billing,description,error,date_history)  VALUES (' +
          '' + (idBilling) + ',' +
          '"Email + Invoice NOT SEND",' +
          '1,' +
          '"' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '"' +
          ')';
      }
      connection.query(request, function (error, billingUpdate) {
        if (error) {
          callback1();
        } else {
          callback1();
        }
      });
    }
  ], function finale() {
    if (stripeError) {
      return res.status(500).json({stripeError: true, stripeErrorMsg: stripeErrorMSG});
    }

    finalData.mailSend = mailSend;
    finalData.isInvoiceError = isInvoiceError;
    finalData.reference = finalBillingNB;

    return res.status(200).json(finalData);
  });
}

exports.placeOrder = placeOrder;