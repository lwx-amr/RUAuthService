"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var userModel = _mongoose2.default.model('users', userSchema);

module.exports = userModel;