const mongoose = require('mongoose');

// Use 0.0.0.0:27017 instead of localhost
const connectionURI = "mongodb://0.0.0.0:27017";//mongodb://0.0.0.0:27017

const connectToMongo = () => {
    mongoose.connect(connectionURI) ;
}

module.exports = connectToMongo;