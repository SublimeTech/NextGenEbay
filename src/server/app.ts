import * as http from "http";
import * as url from "url";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as db from "./db";
import {getProducts} from "./db";
var product = require("./controllers/product");
var user = require("./controllers/user");
var session = require('express-session');
var path = require('path');


var app = express();
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.set('trust proxy', 1);
app.use(session({
    secret: 'MUSTADDTHIS',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.get('/api/status', (req, res) => {
    res.send('OK');
});


app.use(express.static(__dirname + '/../../'));
app.use(express.static(__dirname + '/../client/'));
app.use('app', express.static(__dirname + '/../client/app'));
app.use('app', express.static(__dirname + '/../client/'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/index.html')) ;
});
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/index.html')) ;
});




app.get('/api/products', product.list);
app.post('/api/bid', product.makeBid);

app.post('/api/register', user.register);
app.post('/api/login', user.login);
app.get('/api/logout', user.logout);

app.listen(3000, function () {
    console.log('Test server is up ' + __dirname + '/../../')
});

export var App = app;
