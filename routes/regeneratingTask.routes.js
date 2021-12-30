const router = require("express").Router();

const mongoose = require("mongoose");

const RegeneratingTask = require("../models/RegeneratingTask.model");

const hasAuth = require("../middleware/hasAuth");
router.use(hasAuth);


router.get("/index", async (req, res) => {
  const docs = await RegeneratingTask.find().exec();
  return res.status(200).json({ regenTasks: docs });
});

router.post("/create", (req, res) => {
  const { text, regenInterval, scheduleDate } = req.body;
  if (!text) return res.status(400).json({ error: "no text provided" });
  //sanitize the text here
  //then save it
  RegeneratingTask.create({ text, regenInterval, scheduleDate }).then((task) => {
    return res.status(200).json(task);
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "RegeneratingTask Creation Failed.", error: error })
  );
});

router.post("/update/:id", async (req, res) => {
  const { text, regenInterval, scheduleDate } = req.body;
  if (!text) return res.status(400).json({ error: "no text provided" });
  //sanitize the text here
  //then save it
  RegeneratingTask.findByIdAndUpdate(req.params.id, { text, regenInterval, scheduleDate }).then(() => {
    return res.status(200).json({ message: "Updated RegeneratingTask"});
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "RegeneratingTask Creation Failed.", error: error })
  );
});

router.post("/delete/:id", (req, res) => {
  RegeneratingTask.findByIdAndDelete(req.params.id)
      .then(() => {
        return res
          .status(200)
          .json({ message: "Deleted RegeneratingTask" });
      })
      .catch((error) =>
        res.status(500).json({ errorMessage: "RegeneratingTask Deletion Failed.", error: error })
      );
});

module.exports = router;