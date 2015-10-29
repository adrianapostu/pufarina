var Annyang = require('annyang'),
  request = require('request'),
  annyang = new Annyang();

// Let's define a command.
var commands = {
    'hello': function() {
        alert('Salut');
        request.post('http://192.168.1.115:9000/edison', {data: {
          'edison': true
        }});
    }
};

// Initialize our commands with annyang
annyang.init(commands);
