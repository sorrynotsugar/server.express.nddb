
let NDDB = require('NDDB').NDDB;
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let app = express();
let session = new NDDB();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Content-Type")
  next();
});


app.get('/', function(req, res){
    let session_data = session.fetch();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(session_data));
});

app.post('/', function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json'});
    try {
    	session.insert(req.body);
      session.save('session.json', function() {
          res.end('{"result": "OK"}');
      });
    }
    catch (e) {
      console.log(e);
      res.end('{"result": "session."}');
    }
});

port = process.env.PORT;
session.load('session.json', function() {
  app.listen(port);
  console.log('Listening at http://localhost:' + port)
});
