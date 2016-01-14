var mysql   = require('mysql');
var express = require('express');

var app = express();
var connection = false;

var attepmtDBConnect = setInterval(function() {
  connectToDB(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successful connection');
      clearInterval(attepmtDBConnect);
    }
  });
}, 1000);

var connectToDB = function (callback) {
  connection = mysql.createConnection({
    host     : process.env['DB_PORT_3306_TCP_ADDR'],
    user     : process.env['DB_ENV_MYSQL_USER'],
    password : process.env['DB_ENV_MYSQL_PASSWORD'],
    database : process.env['DB_ENV_MYSQL_DATABASE']
  });

  connection.connect(callback);
}

app.get('/api', function (req, res) {
  if (connection === false || connection.state === 'disconnected') {
    res.status(500).send('{"Error":"Not connected to database yet"}');
    return;
  } else {
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) {
        res.status(500).send(JSON.stringify(err));
        return;
      }
      res.status(200).send('The solution is: ' + rows[0].solution);
      return;
    });
  }
});

app.use(express.static('static'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

