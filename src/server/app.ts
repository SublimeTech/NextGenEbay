import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";

var app = express();

app.get('/status', (req, res) => {
  res.send('OK');
});

app.use(express.static(__dirname + '/../client/'));
app.use(express.static(__dirname + '/../../'));
app.use('app', express.static(__dirname + '/../client/app'));


app.get('*', (req, res) => {
  res.sendFile(__dirname, '/../client/index.html');
});

app.listen(3000, function() {
  console.log('Test server is up '+__dirname+'/../../')
});

export var App = app;
