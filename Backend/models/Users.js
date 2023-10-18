import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    Name:{
            type:String,
            required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Timestamp:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',UserSchema);