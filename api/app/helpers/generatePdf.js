var fs = require('fs');
var pdf = require('html-pdf');
var htmlHead = fs.readFileSync('./static/facturation/facture_header.html', 'utf8');
var htmlTable1 = fs.readFileSync('./static/facturation/table_1.html', 'utf8');
var htmlTable_row = fs.readFileSync('./static/facturation/table_row.html', 'utf8');
var htmlTable_row_head = fs.readFileSync('./static/facturation/table_row_head.html', 'utf8');
var htmlTable_row_footer = fs.readFileSync('./static/facturation/table_row_footer.html', 'utf8');
var connection = require('./../connection');
var moment = require('moment');
var Jimp = require("jimp");
var Promise = require('bluebird');
var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));
var storage = GoogleCloudStorage({
  projectId: 'pdh-dev',
  keyFilename: './app/config/gcloud-pdh-dev-key.json'
})
var fs = require('fs');
var BUCKET_NAME = 'bilings';


var generateFactureTypeHouse = function (facturations, res, next) {
  var name = 'str_' + moment().format('YYYY') + '_' + facturations[0].id_resa_biling;
  var options = {};

  var str = htmlHead.toString().replace('{#num_facture#}', facturations[0].id_resa_biling);
  str = str.toString().replace('{#TVA#}', facturations[0].tva + '%');
  str = str.replace('{#date_edition#}', moment(facturations[0].resa_date).format('YYYY-MM-DD'));
  str = str.replace('{#client_name#}', facturations[0].last_name + ' ' + facturations[0].first_name);
  str = str.replace('{#client_email#}', facturations[0].email);
  str = str.replace('{#client_tel#}', facturations[0].phone);

  var table = htmlTable1.toString().replace('{#desc#}', 'Réservation ' + facturations[0].title + ' du ' + moment(facturations[0].client_checkin_date).format('YYYY-MM-DD') + ' au ' + moment(facturations[0].client_checkout_date).format('YYYY-MM-DD'));
  table = table.replace('{#priceHT#}', facturations[0].price - Math.round(facturations[0].price / (1 + facturations[0].tva)));
  table = table.replace('{#TVA#}', Math.round(facturations[0].price / (1 + facturations[0].tva)));
  table = table.replace('{#priceTTC#}', Math.round(facturations[0].price));
  str = str + table;

  pdf.create(str, options).toFile('static/tmp/' + name + '.pdf', function fct(err, res2) {
    if (err) {
      return console.log(err);
    }
    uploadFacture(res2,
      'static/tmp/',
      'customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/reservations/',
      name + '.pdf',
      function (err3, res3) {
        console.log('https://storage.googleapis.com/bilings/customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/reservations/' + name + '.pdf');
        var dataSend = {
          pdf_biling: 'https://storage.googleapis.com/bilings/customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/reservations/' + name + '.pdf',
          tmpFile: 'static/tmp/' + name + '.pdf'
        }
        return next(dataSend);
      });
  });
}

exports.generateFactureTypeHouse = generateFactureTypeHouse;


var generateFactureTypeService = function (facturations, rows, res, next) {
  var name = 'str_' + moment().format('YYYY') + '_' + facturations[0].id_resa_biling;
  var options = {};

  var str = htmlHead.toString().replace('{#num_facture#}', facturations[0].id_resa_biling);
  str = str.toString().replace('{#TVA#}', facturations[0].tva + '%');
  str = str.replace('{#date_edition#}', moment(facturations[0].resa_date).format('YYYY-MM-DD'));
  str = str.replace('{#client_name#}', facturations[0].last_name + ' ' + facturations[0].first_name);
  str = str.replace('{#client_email#}', facturations[0].email);
  str = str.replace('{#client_tel#}', facturations[0].phone);
  str = str + htmlTable_row_head;

  // gestion des lignes
  var TotalTTC = 0;
  for (var tab in rows) {
    var row = htmlTable_row.toString().replace('{#desc#}', rows[tab].label);
    row = row.toString().replace('{#quantity#}', rows[tab].quantity);
    row = row.toString().replace('{#priceHT#}', rows[tab].price_HT);
    row = row.toString().replace('{#TVA#}', Math.round(rows[tab].TVA));
    row = row.toString().replace('{#total#}', Math.round(rows[tab].total));
    str = str + row;
    TotalTTC = TotalTTC + rows[tab].total;
  }
  var footer = htmlTable_row_footer.toString().replace('{#priceTTC#}', TotalTTC);
  str = str + footer;
  pdf.create(str, options).toFile('static/tmp/' + name + '.pdf', function (err, res2) {
    if (err) {
      return console.log(err);
    }
    uploadFacture(res2,
      'static/tmp/',
      'customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/services/',
      name + '.pdf',
      function (err3, res3) {
        console.log('https://storage.googleapis.com/bilings/customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/services/' + name + '.pdf');
        var dataSend = {
          pdf_biling: 'https://storage.googleapis.com/bilings/customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/reservations/' + name + '.pdf',
          tmpFile: 'static/tmp/' + name + '.pdf'
        }
        return next(dataSend);
      });
  });
}

exports.generateFactureTypeService = generateFactureTypeService;

var generateFactureTypeCredit = function (facturations, res, next) {
  var name = 'str_' + moment().format('YYYY') + '_' + facturations[0].id_resa_biling;
  var options = {};

  var str = htmlHead.toString().replace('{#num_facture#}', facturations[0].id_resa_biling);
  str = str.toString().replace('{#TVA#}', facturations[0].tva + '%');
  str = str.replace('{#date_edition#}', moment(facturations[0].resa_date).format('YYYY-MM-DD'));
  str = str.replace('{#client_name#}', facturations[0].last_name + ' ' + facturations[0].first_name);
  str = str.replace('{#client_email#}', facturations[0].email);
  str = str.replace('{#client_tel#}', facturations[0].phone);

  var table = htmlTable1.toString().replace('{#desc#}', facturations[0].customer_comment);
  table = table.replace('{#priceHT#}', facturations[0].price);
  table = table.replace('{#TVA#}', 0);
  table = table.replace('TVA 10%', 'TVA 0%');
  table = table.replace('{#priceTTC#}', Math.round(facturations[0].price));
  str = str + table;

  pdf.create(str, options).toFile('static/tmp/' + name + '.pdf', function (err, res2) {
    if (err) {
      return console.log(err);
    }
    uploadFacture(res2,
      'static/tmp/',
      'customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/avoir/',
      name + '.pdf',
      function (err3, res3) {
        console.log('https://storage.googleapis.com/bilings/customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/avoir/' + name + '.pdf');
        var dataSend = {
          pdf_biling: 'https://storage.googleapis.com/bilings/customers/customer_' + facturations[0].id_resa_customer + '/' + moment(facturations[0].date_created).format('YYYY') + '/reservations/' + name + '.pdf',
          tmpFile: 'static/tmp/' + name + '.pdf'
        }
        return next(dataSend);
      });
  });
}

exports.generateFactureTypeCredit = generateFactureTypeCredit;

var uploadFacture = function fct(pdfFile, localFileLocation, destPath, name, next) {
  var pdhBucket = storage.bucket(BUCKET_NAME);
  pdhBucket.uploadAsync(localFileLocation + name, {
    public: true, validation: 'md5',
    destination: destPath + name,
    metadata: {contentType: "application/pdf"}
  })
    .then(file => {
      return next();
    });
};

exports.uploadFacture = uploadFacture;
