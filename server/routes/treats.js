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

router.get('/:id', function(req, res) {
  var treatId = req.params.id;
  console.log("treat ID: ", treatId);
  pg.connect(connectionString, function(err, client,done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT * FROM treats WHERE name = $1',
    [treatId],
    function(err, result) {
      done();
      if (err) {
        console.log('insert query error: ', err);
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


router.delete('/:id', function(req, res) {

  var treatId = req.params.id;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('DELETE FROM treats WHERE id = $1',
    [treatId],
    function(err, result) {
      done(); //close connection
      if(err) {
        console.log('delete error');
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  });
});

router.put('/:id', function(req, res){
  treatID = req.params.id;
  treat = req.body;
  console.log("treat id to edit: ", treat);
  pg.connect(connectionString, function(err, client, done){
    if(err){
        console.log('connection error: ', err);
        res.sendStatus(500);
    }
    client.query(
      'UPDATE treats SET name=$1, description=$2, pic=$3' +
      ' WHERE id=$4',
      //array of values to use in the query above
      [treat.name, treat.description, treat.url, treatID ],
      function(err, result){
        if(err){
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
        }
      });


  });
});

module.exports = router;
