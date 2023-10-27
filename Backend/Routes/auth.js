const express = require("express");
const User = require("../models/Users"); // Use this model to store data according to schema
const { body, validationResult } = require("express-validator"); // To add custom validation like minimum password length,or isEmail
const router = express.Router(); // To respond to the router 
const bcrypt = require("bcrypt");

router.post("/",
    // [
    //     body('password',"Make a stronger password").isLength({min:5}),
    //     body("Name","Name cannot be empty").isLength({min:1}), 
    //     body("Email","Invalid user email").isEmail()
    // ],
    (req, res) => {
        const { Name, Email, password } = req.body; // Array destructuring to extract fiels from body.

        if (!Name || !Email || !password) { //No fields should be empty
            res.status(422).json({ message: "please provide the valid data" });
        }

        User.findOne({ Email: Email }) //Check if user already registered. 
            .then((userExist) => {
                if (userExist) {
                    res.status(422).json({ message: "Email already exists" });
                }

                bcrypt.genSalt(5, function (error, salt) {
                    bcrypt.hash(password, salt, function (error, password) { //hash function will return the hash or either error if any
                        const user = new User({ Name, Email, password });
                        user.save()
                            .then(() => {
                                res.status(201).json({ msg: "Registered Successfully" });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(501).json({ msg: "Failed to register" });
                            })
                    });
                });

            })
            .catch(error => console.log(error));
    })

module.exports = router;