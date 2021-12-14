const router = require("express").Router();

const mongoose = require("mongoose");

const Mantra = require("../models/Mantra.model");

const hasAuth = require("../middleware/hasAuth");
router.use(hasAuth);

router.get("/index", async (req, res) => {
  const docs = await Mantra.find().exec();
  return res.status(200).json({ mantras: docs });
});

router.post("/create", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "no text provided" });
  //sanitize the text here
  //then save it
  Mantra.create({ text }).then((mantra) => {
    return res.status(200).json(mantra);
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "Mantra Creation Failed.", error: error })
  );
});

router.post("/update/:id", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "no text provided" });
  //sanitize the text here
  //then save it
  Mantra.findByIdAndUpdate(req.params.id, { text }).then(() => {
    return res.status(200).json({ message: "Updated Mantra"});
  })
  .catch((error) =>
    res.status(500).json({ errorMessage: "Mantra Creation Failed.", error: error })
  );
});

router.post("/delete/:id", (req, res) => {
  Mantra.findByIdAndDelete(req.params.id)
      .then(() => {
        return res
          .status(200)
          .json({ message: "Deleted Mantra" });
      })
      .catch((error) =>
        res.status(500).json({ errorMessage: "Mantra Deletion Failed.", error: error })
      );
});

module.exports = router;