var express = require('express');
var bodyParser = require('body-parser');
var five = require("johnny-five");
var cors = require('cors');
var Edison = require("edison-io");
var path = require('path');

// initialise Edison baord and LED pins
var board = new five.Board({
  io: new Edison()
});


var app = express();
var board_this;

//middleware
app.use(cors())
app.use(bodyParser.json());

app.get('/', function(req, res)
  {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

console.log('edison is live');
// post requests
// {id} is a param, usually a number
app.post('/:id/on', function (req, res) {
      var becId = req.params.id;
      board.pinMode(parseInt(becId), board.MODES.OUTPUT);
      board.digitalWrite(parseInt(becId), 1);
      console.log('led cu id', becId, ' aprins');
      console.log('becul', becId, 's-a aprins');

  res.status(200).send({
    status: 'success'
  })
})

app.post('/:id/off', function (req, res) {
  var becId = req.params.id;

  board.pinMode(parseInt(becId), board.MODES.OUTPUT);
  board.digitalWrite(parseInt(becId), 0);
  console.log('led cu id', becId, ' stins');

  console.log('becul', becId, 's-a stins');

  res.status(200).send({
    status: 'success'
  })
})

app.post('/:id/lock', function (req, res) {
  var becId = req.params.id;

  board.pinMode(parseInt(becId), board.MODES.OUTPUT);
  board_this.servoWrite(3, 80);
  console.log('door locked');
  res.status(200).send({
    status: 'success'
  })
})

app.post('/:id/unlock', function (req, res) {
  var becId = req.params.id;

  board.pinMode(parseInt(becId), board.MODES.OUTPUT);
  board_this.servoWrite(3, 10);
  console.log('door unlocked');

  res.status(200).send({
    status: 'success'
  })
})

var server = app.listen(9000, function () {
  console.log('Example app listening at port 9000');
});
