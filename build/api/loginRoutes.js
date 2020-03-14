"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _loginController = require("../service/loginController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/login", _loginController.checkAuthen, function (req, res) {
    res.json("Hello, we are very happy that you're here");
});
router.post("/login", _loginController.login);

module.exports = router;