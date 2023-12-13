const mongoose = require('mongoose');

// Use 0.0.0.0:27017 instead of localhost
// const connectionURI = "mongodb://localhost:27017//inotebook";//mongodb://0.0.0.0:27017


const connectToMongo = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/inotebook", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("connection successfully ");
    })
}

module.exports = connectToMongo;