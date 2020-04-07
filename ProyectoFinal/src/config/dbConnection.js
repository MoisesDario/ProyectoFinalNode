var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.MSQL_URL,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  puertos : process.env.DB_PORT
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
