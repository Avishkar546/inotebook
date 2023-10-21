const express = require("express");
const User = require("../models/Users");
const router = express.Router();

router.post("/",(req,res)=>{
    // console.log(req.body);
    const user = User(req.body);
    user.save() //returns promise so we can handle the error.
        .then(item =>{
            console.log("Item saved");
        })
        .catch(err =>{
            console.log("error occured");
        })
    res.send(req.body);
})

module.exports = router;