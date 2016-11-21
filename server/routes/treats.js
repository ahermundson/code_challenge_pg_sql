var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/treats';


router.get('/', function(req, res) {
  console.log("get request");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM treats', function(err, result){
      done(); ///close the connection.

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);
    });

  });
});

router.post('/', function(req, res) {
  console.log('Got to treats post');
  var newTreat = req.body;
  console.log(newTreat);
  pg.connect(connectionString, function(err, client,done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('INSERT INTO treats (name, description, pic)' +
    'VALUES ($1, $2, $3)',
    [newTreat.name, newTreat.description, newTreat.url],
    function(err, result) {
      done();
      if (err) {
        console.log('insert query error: ', err);
        res.sendStatus(500);
      } else {
      res.sendStatus(201);
      }
    });
  });
});

module.exports = router;
