const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  create: { type: Date, default: Date.now },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
