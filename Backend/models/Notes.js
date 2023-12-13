const mongoose = require('mongoose');
const { Schema } = mongoose;

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Format day with ordinal suffix
    const day = date.getDate();
    // const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' : (day % 10 === 2 && day !== 12 ? 'nd' : (day % 10 === 3 && day !== 13 ? 'rd' : 'th')));

    // Get month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];

    // Get hours and minutes
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (12:00 AM)

    const minutes = ('0' + date.getMinutes()).slice(-2);

    // Format the final string
    const formattedDateTime = `${day} ${month} ${date.getFullYear()} ${hours}:${minutes} ${ampm}`;

    return formattedDateTime;
}
const currentTimestamp = Date.now();
const formattedDateTime = formatTimestamp(currentTimestamp);

const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Work as foreign key from the User model (collection)
    },
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Tag: {
        type: String,
        default: "General"
    },
    Timestamp: {
        type: String,
        default: formattedDateTime
    }
});

module.exports = mongoose.model('Notes', NoteSchema);