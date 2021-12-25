const router = require("express").Router();

const mongoose = require("mongoose");

const Bug = require("../models/Bug.model");

const hasAuth = require("../middleware/hasAuth");
router.use(hasAuth);

router.get("/index", async (req, res) => {
  const docs = await Bug.find().exec();
  return res.status(200).json({ bugs: docs });
});

router.post("/create", (req, res) => {
  const { title, details, conditions, occurred } = req.body;
  if (!title) return res.status(400).json({ error: "no title provided" });
  //sanitize the text here
  //then save it
  Bug.create({ title, details, conditions, occurred }).then((bug) => {
    return res.status(200).json(bug);
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "Bug Creation Failed.", error: error })
  );
});

router.post("/update/:id", async (req, res) => {
  const { title, details, conditions, occurred } = req.body;
  //sanitize the text here
  //then save it
  Bug.findByIdAndUpdate(req.params.id, { title, details, conditions, occurred }).then(() => {
    return res.status(200).json({ message: "Updated Bug"});
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "Bug Update Failed.", error: error })
  );
});

router.post("/delete/:id", (req, res) => {
  Bug.findByIdAndDelete(req.params.id)
      .then(() => {
        return res
          .status(200)
          .json({ message: "Deleted Bug" });
      })
      .catch((error) =>
        res.status(500).json({ errorMessage: "Bug Deletion Failed.", error: error })
      );
});

module.exports = router;