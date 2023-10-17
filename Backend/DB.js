const mongoose = require('mongoose');

const connectionURI = "mongodb://127.0.0.1:27017";

const connectToMongo = () => {
    mongoose.connect(connectionURI);
}

module.exports = connectToMongo;