import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import usersModel from "../repository/usersModel";

// Funciton to check login
const login  = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    usersModel.findOne({email: email})
        .then( user => {
            if(!user){
                return res.status(400).json("This email is not registered");
            }
            bcrypt.compare(password, user.password)
                .then( isMatched => {
                    if(!isMatched)
                        return res.status(400).json("Email and password is not matched");
                    if(isMatched){
                        res.status(200).json({token: jwt.sign({
                            email: user.email,
                            username: user.username,
                            id: user._id,
                        },'RUSecrect%2020')});
                    }
                })
        })
};

// Middleware to prevent unauthorized users
const loginRequired  = (req, res, next) => {
    if(req.user)
        next();
    else
        return res.status(400).json({message: "Unauthorized user!!"});
};


module.exports = { login, loginRequired};
