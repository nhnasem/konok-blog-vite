const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: String,
    imageURL: String,
    body: String,
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
