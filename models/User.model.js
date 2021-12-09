const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  passhash: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, //if 'true' user will have access to flashcard.create page.
  emailConfirmed: { type: Boolean, default: false },
});

const User = model("User", userSchema);

module.exports = User;
