"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require("config");

var _config2 = _interopRequireDefault(_config);

var _usersModel = require("../repository/usersModel");

var _usersModel2 = _interopRequireDefault(_usersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Funciton to check login
var login = function login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email + "   " + password);
    _usersModel2.default.findOne({ email: email }).then(function (user) {
        if (!user) {
            return res.status(400).json("This email is not registered");
        }
        console.log(user.hashPassword);
        _bcrypt2.default.compare(password, user.hashPassword).then(function (isMatched) {
            if (!isMatched) return res.status(400).json("Email and password is not matched");
            if (isMatched) {
                var payload = {
                    id: user.id,
                    email: user.email
                };
                _jsonwebtoken2.default.sign(payload, _config2.default.get("token.jwtKey"), { expiresIn: _config2.default.get("token.expiresIn") }, function (err, token) {
                    if (err) {
                        console.log(err);
                    }
                    res.status(200).json({ "token": token });
                });
            }
        });
    });
};

// Middleware to prevent unauthorized users
var checkAuthen = function checkAuthen(req, res, next) {
    var reqToken = checkHeader(req, res);
    _jsonwebtoken2.default.verify(reqToken, _config2.default.get("token.jwtKey"), function (err, authorizedData) {
        if (err) return res.status(403).json({ message: "Unauthorized user!!" });else {
            console.log(authorizedData);
            next();
        }
    });
};

// Check if header is ok
var checkHeader = function checkHeader(req, res) {
    var header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        var bearer = header.split(' ');
        var token = bearer[1];
        console.log(bearer.toString());
        return token;
    } else {
        return res.status(403).json({ message: "Unauthorized user!!" });
    }
};

module.exports = { login: login, checkAuthen: checkAuthen };