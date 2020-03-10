import mongoose from "mongoose";

const Schema = mongoose.schema;

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

export const userModel = mongoose.model('users', userSchema);
