const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const mantraSchema = new Schema({
  text: { type: String, required: true },
});

const Mantra = model("Mantra", mantraSchema);

module.exports = Mantra;
