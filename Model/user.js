const mogoose = require("mongoose");

const { Schema } = mogoose;

const userSchema = new Schema({
  name: { type: String, required: true, unquie: true },
  email: { type: String, required: true, unquie: true },
  phone: { type: String, required: true, unquie: true },
  password: { type: String, required: true },
  create: { type: Date, default: Date.now },
});

const user = mogoose.model("user", userSchema);

module.exports = user;
