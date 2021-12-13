const router = require("express").Router();

const mongoose = require("mongoose");

const Task = require("../models/Task.model");

const hasAuth = require("../middleware/hasAuth");
router.use(hasAuth);


router.get("/index", async (req, res) => {
  const docs = await Task.find().exec();
  return res.status(200).json({ tasks: docs });
});

router.post("/create", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "no text provided" });
  //sanitize the text here
  //then save it
  Task.create({ text }).then(() => {
    return res.status(200).json({ message: "Created New Task"});
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "Task Creation Failed.", error: error })
  );
});

router.post("/update/:id", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "no text provided" });
  //sanitize the text here
  //then save it
  Task.findByIdAndUpdate(req.params.id, { text }).then(() => {
    return res.status(200).json({ message: "Updated Task"});
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "Task Creation Failed.", error: error })
  );
});

router.post("/delete/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
      .then(() => {
        return res
          .status(200)
          .json({ message: "Deleted Task" });
      })
      .catch((error) =>
        res.status(500).json({ errorMessage: "Task Deletion Failed.", error: error })
      );
});

module.exports = router;