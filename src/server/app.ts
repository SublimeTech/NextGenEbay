import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as db from "./db";
import {getProducts} from "./db";
var user = require("./controllers/product");


var app = express();
app.set('view engine', 'jade');

app.get('/status', (req, res) => {
  res.send('OK');
});

app.use(express.static(__dirname + '/../client/'));
app.use(express.static(__dirname + '/../../'));
app.use('app', express.static(__dirname + '/../client/app'));


app.get('*', (req, res) => {
  getProducts(function(products){
    console.log(products);
  });
  res.sendFile(__dirname, '/../client/index.html');
});


app.get('/products', user.list);

app.listen(3000, function() {
  console.log('Test server is up '+__dirname+'/../../')
});

export var App = app;
