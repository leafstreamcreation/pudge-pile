const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  text: { type: String, required: true, unique: true },
  updates: { type: [Date] },
});

const Task = model("Task", taskSchema);

module.exports = Task;
