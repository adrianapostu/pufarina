var express = require('express');
var bodyParser = require('body-parser');
var five = require("johnny-five");
var cors = require('cors');
var Edison = require("edison-io");
var path = require('path');

// initialise Edison baord and LED pins
var board = new five.Board({
  io: new Galileo()
});


var app = express();

//middleware
app.use(cors())
app.use(bodyParser.json());

app.get('/', function(req, res)
  {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

// post requests
// {id} is a param, usually a number
app.post('/:id/on', function (req, res) {
  var becId = req.params.id;

  board.on("ready", function() {
      this.pinMode(becId, this.MODES.OUTPUT);
      board.digitalWrite(becId, 1);
  });
  console.log('becul', becId, 's-a aprins');

  res.status(200).send({
    status: 'success'
  })
})

app.post('/:id/off', function (req, res) {
  var becId = req.params.id;

  board.on("ready", function() {
      this.pinMode(becId, this.MODES.OUTPUT);
      board.digitalWrite(becId, 0);
  });

  console.log('becul', becId, 's-a stins');

  res.status(200).send({
    status: 'success'
  })
})

var server = app.listen(9000, function () {
  console.log('Example app listening at port 9000');
});
