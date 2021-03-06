const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");

const Schema = mongoose.Schema;
const userSchema =  Schema({
    firstName:{
        type:String,
        required: true,
        maxlength: 50,
    },
    lastName:{
        type:String,
        required: true,
        maxlength: 50,
    },
    email:{
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format")
            }
        }
    },
    password:{
        type:String,
        required: true,
        minlength: 8,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    created_date:{
        type:Date,
        default: Date.now
    }
});

// encrypt password before save user
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8);
    next()
});

// Compare hash password for login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error('Unable to login');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login');
    return user;
}

// Generate Auth Token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const payload = {
        id: user.id.toString(),
        email: user.email
    };
    const token = jwt.sign(payload, config.get("token.jwtKey"));
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

// Create user JSON object
userSchema.methods.toJSON = function () {
    const user = this;
    const publicUserData = user.toObject();
    publicUserData.password = undefined;
    publicUserData.tokens = undefined;
    return publicUserData;
}

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
