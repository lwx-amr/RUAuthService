import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    hashPassword:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: false
    },
    created_date:{
        type:Date,
        default: Date.now
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
