const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../Middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Get all the notes of logged in user. //api/notes/getnotes. 
router.get("/getnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Error occured");
    }
});

//ROUTE 2 : Add new note to in the section of logged in user. //api/notes/addnotes.
router.post("/addnotes", fetchUser, [ //fetchUser is middleware used to authenticate the user.
    body('Title', "Make a understandable title").isLength({ min: 5 }),
    body("Description", "Description is required").isLength({ min: 1 }),
],
    async (req, res) => {
        const errors = validationResult(req); // Catch the errors if any in the credentials.
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        try {
            const { Title, Description, Tag } = req.body;
            const note = new Notes({ Title, Description, Tag, user: req.user.id });
            note.save()
                .then(() => {
                    res.status(201).json(note);
                }).catch(() => {
                    res.status(501).json("Some internal Error");
                })
        } catch (error) {
            console.log(error);
        }


    });

//ROUTE 3 : Update the note og logged in user.We can also POST but using PUT to upadte is standard technique.
//api/notes/upadtenote
router.put("/updatenote/:id", fetchUser, async (req, res) => { //id passed as a params to route. It is note id present in mongo databse as _id
    const { Title, Description, Tag } = req.body; // Destructuring get updated notes information
    let newNote = {}; //It will store all the changes.
    if (Title) { newNote.Title = Title };
    if (Description) { newNote.Description = Description };
    if (Tag) { newNote.Tag = Tag };

    let note = await Notes.findById(req.params.id); // Get the id from the user to update. It return promise
    if (!note) { return res.status(404).json("Not fount"); } // If note not present

    if (note.user != req.user.id) { return res.status(401).json("Unauthorized access"); } // Check logged in ID and ID present in note is present.

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
})

router.delete("/removenote/:id", fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Unauthorized access") };

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Deleted Successfully" });

    } catch (error) {
        res.status(501).json({"error":"Internal sever erro"});
    }
})
module.exports = router;