var connection = require('./../connection');
var moment = require('moment');

// récupération de toutes les news en une requête, avec paramètre de pagination
var getHouseKeepers = function (req, res, next) {
  const returnData = [];
  const returnDataFinal = [];
  var request = 'select *  from housekeeper WHERE online = 1 order by last_name Asc, first_name asc ';

  connection.query(request,
    function (error, housekeeper) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(housekeeper)
    });

};

exports.getHouseKeepers = getHouseKeepers;
var getHouseKeeperByPk = function (req, res, next) {
  const idHouseKeeper = req.params.idHouseKeeper;
  var request = 'select *  from housekeeper WHERE id_housekeeper = ' + idHouseKeeper;

  connection.query(request,
    function (error, housekeeper) {
      if (error || typeof housekeeper[0] === "undefined") {
        console.log(error);
      }
      return res.status(200).json(housekeeper[0])
    });

};

exports.getHouseKeeperByPk = getHouseKeeperByPk;

var getHouseKeeperHousesByPk = function fct(req, res) {
  const idHouseKeeper = req.params.idHouseKeeper;
  var request = 'SELECT * FROM pdh.house_lang , pdh.resa_cothouse_config where house_lang.lang=\'fr\' and house_lang.id_house = resa_cothouse_config.id_house and resa_cothouse_config.id_housekeeper= ' + idHouseKeeper;

  connection.query(request,
    function (error, housekeeperHouses) {
      if (error) {
        console.log(error);
      }
      return res.status(200).json(housekeeperHouses);
    });

};

exports.getHouseKeeperHousesByPk = getHouseKeeperHousesByPk;

var updateHouseKeeper = function (req, res, next) {
  const idHouseKeeper = req.params.idHouseKeeper;
  var request = ' update housekeeper set ' +
    ' last_name ="' + ((typeof req.body.last_name !== 'undefined') ? req.body.last_name : '') + '", ' +
    ' first_name ="' + ((typeof req.body.first_name !== 'undefined') ? req.body.first_name : '') + '", ' +
    ' email ="' + ((typeof req.body.email !== 'undefined') ? req.body.email : '') + '", ' +
    ' tel_1 ="' + ((typeof req.body.tel_1 !== 'undefined') ? req.body.tel_1 : '') + '", ' +
    ' tel_2 ="' + ((typeof req.body.tel_2 !== 'undefined') ? req.body.tel_2 : '') + '", ' +
    'date_updated = "' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '" ' +
    'WHERE id_housekeeper = ' + req.body.id_housekeepe;


  connection.query(request, function (error, housekeeper) {
    var request2 = 'select *  from housekeeper WHERE id_housekeeper = ' + idHouseKeeper;

    connection.query(request2,
      function (error, housekeeper) {
        if (error || typeof housekeeper[0] === "undefined") {
          console.log(error);

          return res.status(404).json({error: 'not found'})
        }

        return res.status(200).json(housekeeper[0])
      });
  });
};

exports.updateHouseKeeper = updateHouseKeeper;

var addHouseKeeper = function (req, res, next) {
  var request = ' INSERT into housekeeper (last_name,first_name,email,tel_1,tel_2,date_created,date_updated)  VALUES (' +
    '"' + ((typeof req.body.last_name !== 'undefined') ? req.body.last_name : '') + '",' +
    ' "' + ((typeof req.body.first_name !== 'undefined') ? req.body.first_name : '') + '", ' +
    ' "' + ((typeof req.body.email !== 'undefined') ? req.body.email : '') + '", ' +
    ' "' + ((typeof req.body.tel_1 !== 'undefined') ? req.body.tel_1 : '') + '", ' +
    ' "' + ((typeof req.body.tel_2 !== 'undefined') ? req.body.tel_2 : '') + '", ' +
    ' "' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '", ' +
    ' "' + (moment().utc().format("YYYY-MM-DD HH:mm:ss")) + '"  ' +
    ')';
  console.log(request)
  connection.query(request, function (error, housekeeper) {
    return res.status(200).json({saved: true})
  });
};

exports.addHouseKeeper = addHouseKeeper;

