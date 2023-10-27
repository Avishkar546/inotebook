const express = require("express");
const User = require("../models/Users"); // Use this model to store data according to schema
const { body, validationResult } = require("express-validator"); // To add custom validation like minimum password length,or isEmail
const router = express.Router(); // To respond to the router 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtAuthKey = "Gcoe@r@N@vod@y@"; // Secret key for JWT authentication.

// Create a route to register a new user
router.post("/registration",
    [
        body('password', "Make a stronger password").isLength({ min: 5 }),
        body("Name", "Name cannot be empty").isLength({ min: 1 }),
        body("Email", "Invalid user email").isEmail()
    ],
    (req, res) => {
        const errors = validationResult(req); // Catch the errors if any in the credentials.
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

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
                                let data = {
                                    user: {
                                        id: user.id
                                    }
                                }
                                var jwtToken = jwt.sign(data, jwtAuthKey);
                                console.log(jwtToken);
                                res.status(201).json({ jwtToken});
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

// Login Authentication Route
router.post("/login",
    [
        body('password', "Make a stronger password").exists(),
        body("Email", "Invalid user email").isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req); // Catch the errors if any in the credentials.
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { Email, password } = req.body;// As we are using ES6 Array destructuring please provide the same name as come in req.body

        try {
            let user = await User.findOne({Email});
            if (!user) {
                return res.status(400).json("Please provide the valid credentials");
            }

            let passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(400).json("Please provide the valid credentials");
            }
            let data = {
                user: {
                    id: user.id
                }
            }
            var jwtToken = jwt.sign(data, jwtAuthKey);
            // console.log(jwtToken);
            res.status(201).json({ jwtToken});

        } catch {
            res.status(500).json("Internal Server error");
        }

    });

module.exports = router; 