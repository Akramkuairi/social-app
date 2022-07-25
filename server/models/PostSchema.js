import mongoose from "mongoose";

// const getTime = () => ;

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  comments: {
    type: [
      {
        commentAuthor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
    default: [],
  },
  date: {
    type: Number,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
