const jwt = require("jsonwebtoken");
const config = require("config");
const Users = require('../repository/usersModel');

// Register user in database
const registerUser  = async (req, res) =>{
    try {
        const user = await Users(req.body);
        await user.save();
        res.send({ user });
    }
    catch (e) {
        res.status(400).send(e)
    }
};

// Function to check login
const login  = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const cookieOptions = {
            httpOnly: true,
        };
        const user = await Users.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.cookie('rankup-jt', token, cookieOptions).send({user, token });
    } catch (e) {
        res.status(400).send("Error!");
    }
};

// Middleware to prevent unauthorized users
const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies['rankup-jt'];
        if (!token)
            res.redirect(200, '/login');
        const decoded_token = jwt.verify(token, config.get("token.jwtKey"));
        const user = await Users.findOne({ _id: decoded_token.id, 'tokens.token': token })
        if (!user) throw new Error();
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send('Error!');
    }
};

const logOut = async (req, res, next) => {
    try {
        const { user, token } = req;
        user.tokens = user.tokens.filter((t) => t.token !== token);
        await user.save();
        res.clearCookie('rankup-jt');
        res.send();
    } catch (e) {
        res.status(400).send();
    }
};

// Check if logged Before
const loggedBefore = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
        };
        const { token, user } = req
        if (token && user) {
            res.cookie('rankup-jt', req.token, cookieOptions).send({ user, token })
        }
    } catch (e) {
        res.status(400).send()
    }
};

module.exports = { login, checkAuth, registerUser, logOut, loggedBefore};
