const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;