import * as db from "../db";
import {getUserByUsername} from "../db";
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = function (req, res) {
    console.log(req.session.currentUser);
    res.setHeader('Content-Type', 'application/json');
    if (!req.body.username || !req.body.password) {
        res.send(JSON.stringify({'error': true, error_msg: 'Invalid params'}));
        return;
    }
    db.getUserByUsername(req.body.username, function (data) {
        if (!data) {
            res.send(JSON.stringify({error: true, error_msg: 'Invalid credentials'}));
            return;
        }
        bcrypt.compare(req.body.password, data.password, function (err, isPassword) {
            if (isPassword) {
                req.session.isAuthenticated = true;
                req.session.currentUser = data;
                delete data.password;
                res.send(JSON.stringify({error: false, response_msg: 'User authenticated success.'; user: data}));
            } else {
                res.send(JSON.stringify({error: true, error_msg: 'Invalid credentials'}));
            }
        });
    })
};


exports.checkAuth = function (req, res) {
};

exports.logout = function (req, res) {
    if (!req.session.isAuthenticated) {
        res.send(JSON.stringify({error: true, error_msg: 'User is not authenticated'}));
    } else {
        req.session.user = null;
        req.session.isAuthenticated = false;
        res.send(JSON.stringify({error: false, response_msg: 'User logged out success'}));
    }
};

exports.register = function (req, res) {
    var error = false;
    var errors = {username: [], password: []};
    if (!req.body.username) {
        error = true;
        errors.username.push('Username can\'t be empty');
    }
    if (!req.body.password) {
        error = true;
        errors.password.push('Password can\'t be empty')
    } else {
        if (req.body.password.length < 6 || req.body.password.length > 8) {
            errors.username.push('Password must be between 6 and 8 characters');
        }
    }

    if (error == true) {
        res.send(JSON.stringify({error: true, errors: errors}));
        return;
    }

    db.getUserByUsername(req.body.username, function(data){
        if (!data) {
            db.createUser(req.body.username, req.body.password, function (data) {
                if (!data) {
                    res.send(JSON.stringify({error: true, response_msg: 'Internal error'}), 500)
                } else {
                    res.send(JSON.stringify({error: false, response_msg: 'User cr'}))
                }
            });
        } else {
            res.send(JSON.stringify({error: true, response_msg: 'Username already exist'}))
        }
    });
};