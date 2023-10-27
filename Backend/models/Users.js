// import mongoose from 'mongoose';
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
        // required:true
    },
    Timestamp: {
        type: Date,
        default: Date.now
    }
});

// UserSchema.pre('save', function(next){
//     if(this.isModified(this.password)){
//         this.password = bcrypt.hash(this.password,12);
//         this.confirmPassword = bcrypt.hash(this.confirmPassword,12);
//     }
//     next();
// })

const User = mongoose.model('User', UserSchema);
module.exports = User;