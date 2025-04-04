import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);

export default Post;
