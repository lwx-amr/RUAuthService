import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import config from "config";
import authRoutes  from "./api/authRoutes";

// load configurations
const port = config.get("app.port");
const db = config.get("database.url");
const prefix = config.get("api.prefix");
const app  =  express();

// Using helmet to increase security
app.use(helmet());

// Middleware to add header to response of the any request
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key");
    next();
});

// Using Limiter to prevent attacks
new RateLimit({
    windowMs: 15*60*1000,       // 15 min is the time of our cycle
    max: 100,                   // Max number of requests
    dealyMs: 0                  // Disable dalay bentween each request
    // This mean each ip will be able to make only 100 request in each 15 min and there is no dealy between requests
});

// Express Parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Calling service routes
app.use(prefix,authRoutes);

// Running server
const listen = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export port
module.exports= app;
// module.exports.port=listen.address().port;
