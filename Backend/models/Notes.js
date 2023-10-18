import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
    Title:{
            type:String,
            required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Tag:{
        type:String,
        default:"General"
    },
    Timestamp:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Notes',NoteSchema);