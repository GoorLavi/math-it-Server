// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sql12.freesqldatabase.com',
  user     : 'sql12169312',
  password : '5jJaax1wGe',
  database : 'sql12169312'
});


connection.connect();



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

  connection.query('SELECT * from players', function(err, rows, fields) {
    if (!err)
      res.json({ message: rows});

    else
      res.json({ message: 'Error while performing Query.' });

  });


});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
