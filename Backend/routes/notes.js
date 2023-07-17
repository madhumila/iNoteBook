const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

// rote1:get all the notes using GET
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
// rote2:Add a note using post

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);
// rote3:Update a note using put
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a new note object
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
  let note = await Notes.findById(req.params.id);
  if (!note) {
    res.status(404).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json({note});
});
// rote4:Update a note using delete
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
try{

    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"note deleted",note:note});
}catch(error){
console.error(error.message)
res.status(500).send("internal server error")
}
})
module.exports = router;
