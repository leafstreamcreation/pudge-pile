const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const bugSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String },
  conditions: { type: [String] },
  occurred: { type: Date, default: () => new Date(Date.now()).toISOString(), },
}, {
  timestamps: true,
});

const Bug = model("Bug", bugSchema);

module.exports = Bug;
