const { Schema, model} = require("mongoose");

const postSchema = new Schema({
  content: String,
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, {timestamps: true});

const Post = model("post", postSchema);
module.exports = Post;
