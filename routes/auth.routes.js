const router = require("express").Router();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const Session = require("../models/Session.model");
const SESSION_EXPIRATION = 1000 * 60 * 60 * 24; //Sessions live for 1 day

const PassHash = require("../models/PassHash.model");

const ERRORS = require("../errors/auth.errors");

router.post("/login", async (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json(ERRORS.LOGIN.MISSING_PASSWORD);

  const savedHash = await PassHash.findOne().exec();
  if (!savedHash?.hash) return res.status(500).json(ERRORS.LOGIN.PASSWORD_UNSET);

  const passCompare = await bcrypt.compare(password, savedHash.hash)
  if (!passCompare) return res.status(400).json(ERRORS.LOGIN.INCORRECT_PASSWORD);

  const oldSession = await Session.findOne().exec();
  if (oldSession) Session.findByIdAndDelete(oldSession._id).exec();

  const newSession = await Session.create({ expires: Date.now() + SESSION_EXPIRATION });
  return res.status(200).json({ session: newSession });
});

module.exports = router;
