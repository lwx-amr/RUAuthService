import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";
import usersModel from "../repository/usersModel";

// Funciton to check login
const login  = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email + "   " + password);
    usersModel.findOne({email: email})
        .then( user => {
            if(!user){
                return res.status(400).json("This email is not registered");
            }
            console.log(user.hashPassword);
            bcrypt.compare(password, user.hashPassword)
                .then( isMatched => {
                    if(!isMatched)
                        return res.status(400).json("Email and password is not matched");
                    if(isMatched){
                        const payload = {
                            id: user.id,
                            email: user.email
                        };
                        jwt.sign(payload, config.get("token.jwtKey"), {expiresIn: config.get("token.expiresIn")}, (err, token)=>{
                            if(err) { console.log(err) }
                            res.status(200).json({"token": token});
                        });
                    }
                })
        })
};

// Middleware to prevent unauthorized users
const checkAuthen = (req, res, next) => {
    const reqToken = checkHeader(req, res);
    jwt.verify(reqToken, config.get("token.jwtKey"), (err, authorizedData) => {
        if(err)
            return res.status(403).json({message: "Unauthorized user!!"});
        else {
            console.log(authorizedData);
            next();
        }
    });
};

// Check if header is ok
const checkHeader = (req, res) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        console.log(bearer.toString());
        return token;
    } else {
        return res.status(403).json({message: "Unauthorized user!!"});
    }
}

module.exports = { login, checkAuthen};
