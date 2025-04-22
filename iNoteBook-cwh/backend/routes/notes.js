const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); // Import these functions
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");

// ROUTE: 1 --> Fetch all notes of the user
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes); // Send notes in JSON format
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" }); // Send JSON error response
  }
});

// ROUTE: 2 --> Add new notes of the user: login required
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter a valid title with at least length of 3").isLength({
      min: 3,
    }),
    body(
      "description",
      "Enter a valid description with at least length of 5"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      // Ensure 'Note' is used instead of 'note'
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote); // Send the saved note in JSON format
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" }); // Send JSON error response
    }
  }
);

//ROUTE: 3--> /api/notes/updatenotes. login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body; //destructuring
  //create newNote Objet
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE: 4--> /api/notes/deletenotes. login required
router.delete(
  "/deletenote/:id",
  fetchUser,

  async (req, res) => {
    //const { title, description, tag } = req.body; //destructuring
    try {
      //find the note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      // Allow deletion if the user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ Success: "Note has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
