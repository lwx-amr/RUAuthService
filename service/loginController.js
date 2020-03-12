import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
                        jwt.sign(payload, 'RUSecrect%2020', function(err, token) {
                            res.status(200).json({"token": token});
                        });
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
