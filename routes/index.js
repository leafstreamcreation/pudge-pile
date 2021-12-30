const router = require("express").Router();

const authRoutes = require("./auth.routes");
const mantraRoutes = require("./mantra.routes");
const taskRoutes = require("./task.routes");
const bugRoutes = require("./bug.routes");
const regeneratingTaskRoutes = require("./regeneratingTask.routes");

const hasAuth = require("../middleware/hasAuth");

const mongoose = require("mongoose");
const RegeneratingTask = require("../models/RegeneratingTask.model");
const Task = require("../models/Task.model");
const Mantra = require("../models/Mantra.model");
const Bug = require("../models/Bug.model");


router.get("/", (req, res, next) => {
  res.status(200).send("🐷");
});

router.get("/index", hasAuth, async (req, res, next) => {
  const data = {};
  data.regenTasks = await RegeneratingTask.find().exec();
  data.tasks = await Task.find().exec();
  data.mantras = await Mantra.find().exec();
  data.bugs = await Bug.find().exec();
  res.status(200).json(data);
});

router.use("/auth", authRoutes);
router.use("/mantra", mantraRoutes);
router.use("/task", taskRoutes);
router.use("/bug", bugRoutes);
router.use("/regenTask", regeneratingTaskRoutes);

//add routes for other models here

module.exports = router;