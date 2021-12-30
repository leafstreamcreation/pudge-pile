const router = require("express").Router();

const authRoutes = require("./auth.routes");
const mantraRoutes = require("./mantra.routes");
const taskRoutes = require("./task.routes");
const bugRoutes = require("./bug.routes");
const regeneratingTaskRoutes = require("./regeneratingTask.routes");


router.get("/", (req, res, next) => {
  res.status(200).send("🐷");
});

router.use("/auth", authRoutes);
router.use("/mantra", mantraRoutes);
router.use("/task", taskRoutes);
router.use("/bug", bugRoutes);
router.use("/regenTask", regeneratingTaskRoutes);

//add routes for other models here

module.exports = router;