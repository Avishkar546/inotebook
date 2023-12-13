//This file is heart of project. Everything starts from here.
const connectToMongo = require("./DB"); // It is a connection file that connects to mongodb databse i.e Compass.
const express = require("express"); // 
const bodyParser = require("body-parser")
const cors = require("cors");

connectToMongo(); // Connect to mongodb databse.

const app = express();

app.use(cors()); // Handle the cors
app.use(express.json()); // To send the json data we use this middleware.
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("GCOEARA");
});

app.use("/api/auth", require("./Routes/auth")); // Authentication route for email password
app.use("/api/notes",require("./Routes/notes")); // CRUD opearation on user notes.

app.listen(3000, () => { // start the server.
    console.log("Server is listening");
})