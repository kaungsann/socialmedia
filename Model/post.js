const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  tag: { type: Schema.Types.ObjectId, ref: "tag" },
  comment: { type: Schema.Types.ObjectId },
  like: { type: Number, default: 0 },
  content: { type: String, required: true },
  image: { type: String },
  create: { type: Date, default: Date.now },
});
const Post = mongoose.model("post", postSchema);

module.exports = Post;
