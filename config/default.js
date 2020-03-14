'use strict';
require('dotenv').config();
module.exports = {
    app: {
        name: "authenticationsystem",
        baseUrl: `http://localhost:`,
        port: process.env.PORT
    },
    api: {
        prefix: '^/api/v[1-9]',
        version: [1],
    },
    database: {
        url: process.env.DB_URL,
    },
    token: {
        jwtKey: 'RUSecrect%2020',
        expiresIn: 3600
    }
};
