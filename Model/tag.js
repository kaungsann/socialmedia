const mongoose = require("mongoose");

const { Schema } = mongoose;

const tagSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  name: { type: String, required: true },
  create: { type: Date, default: Date.now },
});

const tag = mongoose.model("tag", tagSchema);

module.exports = tag;
