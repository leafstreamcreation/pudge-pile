const router = require("express").Router();

// const authRoutes = require("./auth.routes");
const mantraRoutes = require("./mantra.routes");


router.get("/", (req, res, next) => {
  res.status(200).send("🐷");
});

// router.use("/auth", authRoutes);
router.use("/mantra", mantraRoutes);

//add routes for other models here

module.exports = router;