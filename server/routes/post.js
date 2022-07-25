// Libraries and Packages
import express from "express";

//  Middleware
import { postValidate } from "../middleware/validation.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import Post from "../models/PostSchema.js";
import {
  getUserAndTheirFriendsPosts,
  getUserPosts,
} from "../functions/postQueries.js";

// Express Routes
const router = express.Router();
const error = 401;
//Routes

router.get("/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).populate(
    "author comments.commentAuthor"
  );

  return res.status(200).send({
    id: post._id,
    author: post.author,
    post: post.post,
    likes: post.likes,
    comments: post.comments,
    date: post.date,
  });
});

router.delete("/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  if (req.body.id === post.author.toString()) {
    return post
      .delete()
      .then(() => res.status(200).send("deleted"))
      .catch((err) => res.status(400));
  }
  return res.status(401).send("error");
});

router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  await Post.updateOne(
    { _id: postId },
    {
      $set: {
        post: req.body.editedPost,
      },
    }
  );

  const profilePosts = await getUserPosts(req.body.id);
  const userPosts = await getUserAndTheirFriendsPosts(req.body.id);
  const post = await Post.findOne({ _id: postId });

  return res.status(200).send({
    post: post,
    profilePosts: profilePosts,
    userPosts: userPosts,
  });
});

router.post("/new/comment/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  // console.log(post);
  if (!post) {
    return res.status(404).send("no post found");
  }
  post.comments.push({
    commentAuthor: req.body.author,
    comment: req.body.comment,
  });

  post.save(async () => {
    try {
      const popAuthor = await Post.findOne({ _id: req.params.id }).populate(
        "author comments.commentAuthor"
      );

      return res.status(200).send({
        id: popAuthor._id,
        author: popAuthor.author,
        post: popAuthor.post,
        likes: popAuthor.likes,
        comments: popAuthor.comments,
      });
    } catch {
      (err) => res.status(400).send("error");
    }
  });
  return;
});

router.post("/like", async (req, res) => {
  const userId = req.body.id;
  const postId = req.body.postId;
  // console.log("like route");
  const post = await Post.findOne({ _id: postId });
  // console.log(post);
  if (post.likes.length !== 0 && post.likes.includes(userId)) {
    post.likes = post.likes.filter((like) => like.toString() !== userId);
  } else {
    post.likes.push(userId);
  }
  await post.save(async () => {
    try {
      const post = await Post.findOne({ _id: postId });
      const profilePosts = await getUserPosts(
        req.body.profileId || req.body.id
      );
      const userPosts = await getUserAndTheirFriendsPosts(userId);

      return res.status(200).send({
        likes: post.likes,
        profilePosts: profilePosts,
        userPosts: userPosts,
      });
    } catch {
      (err) => res.status(400).send("error");
    }
  });
});

export default router;
