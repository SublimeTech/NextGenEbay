import * as db from "../db";
import {getUserByUsername} from "../db";
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = function(req, res) {
    console.log(req.session.currentUser);
    res.setHeader('Content-Type', 'application/json');
    if (!req.body.username || !req.body.password)  {
        res.send(JSON.stringify({'error': true, error_msg: 'Invalid params'}));
        return;
    }
    db.getUserByUsername(req.body.username, function(data){
        if (!data) {
            res.send(JSON.stringify({error: true, error_msg: 'Invalid credentials'}));
            return;
        }
        bcrypt.compare(req.body.password, data.password, function(err, isPassword){
            if (isPassword) {
                req.session.isAuthenticated = true
                req.session.currentUser = data;
                res.send(JSON.stringify({error: false, response_msg: 'User authenticated success.'}));
            } else {
                res.send(JSON.stringify({error: true, error_msg: 'Invalid credentials'}));
            }
        });
    })
};


exports.checkAuth = function(req, res) {
};

exports.logout = function(req, res) {
    if (!req.session.isAuthenticated) {
        res.send(JSON.stringify({error: true, error_msg: 'User is not authenticated'}));
    } else {
        req.session.user = null;
        req.session.isAuthenticated = false;
        res.send(JSON.stringify({error: false, response_msg: 'User logged out success'}));
    }
};