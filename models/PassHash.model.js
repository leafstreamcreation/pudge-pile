const {Schema, model} = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const passHashSchema = new Schema({
    hash: { type: String, required: true },
});

const PassHash = model("PassHash", passHashSchema);

module.exports = PassHash;