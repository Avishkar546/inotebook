const connectToMongo = require("./DB");
const express = require("express");
connectToMongo();

const app = express();

app.get("/" , (req,res)=>{
    res.send("GCOEARA");
})


app.listen(3000 , ()=>{
    console.log("Server is listening");
})