const connectToMongo = require("./DB");
const express = require("express");
connectToMongo();

const app = express();

app.get("/" , (req,res)=>{
    res.send("GCOEARA");
});

app.use("/api/auth",require("./Routes/auth")); // Authentication route for email password
app.use("/api/notes",require("./Routes/notes"));

app.listen(3000 , ()=>{
    console.log("Server is listening");
})