let express = require("express");
let noteRouter = express.Router();
let jwt = require("jsonwebtoken");

let { NoteModel } = require("../model/note.model");

noteRouter.post("/add", async (req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New note is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

noteRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  let decoded = jwt.verify(token, "meat");

  try {
    if (decoded) {
      let notes = await NoteModel.find({ user: decoded.userID });
      res.status(200).send({ msg: `Here are all the notes `, notes });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

noteRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let note = await NoteModel.findById({ _id: id });
    res.status(200).send(note);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "Note is updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Note is Delete" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  noteRouter,
};
