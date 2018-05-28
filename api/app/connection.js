var mysql = require('mysql');
var fs = require('fs');
// Connnect database mysql
var config = {}
/*
config.user = 'pdh';
config.password = 'pdh2017';
config.database = 'pdh';
config.socketPath = '/cloudsql/pdh-dev:europe-west1:pdh-dev'; //`/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;

if (process.env.NODE_ENV === 'production') {
  config.user = process.env.SQL_USER;
  config.password = process.env.SQL_PASSWORD;
  config.database = process.env.SQL_DATABASE;
  config.socketPath = process.env.MYSQL_DSN;//`/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}
else {

}
*/

config = {
  host: '127.0.0.1',
  database: 'andromedeetpersee',
  user: 'root',
  password: 'gUc4WVsZ'
};
var connection = mysql.createConnection(config);


connection.connect(function (err) {
  if (err) {
    console.log(err)
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
module.exports = connection;