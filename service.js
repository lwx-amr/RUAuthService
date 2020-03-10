import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import RateLimit from "express-rate-limit";

const app  =  express();
const port = 3000;

// Using helmet to increase security
app.use(helmet());

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
mongoose.connect('mongodb://localhost/RUUsersDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Running server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
