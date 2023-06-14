const { Schema, model } = require("mongoose");

// Question: How to update an array of items in Mongoose = Array.prototype.toSpliced()
const postSchema = new Schema(
  {
    content: String,
    image: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = model("post", postSchema);
module.exports = Post;
