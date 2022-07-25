// Libraries and Packages
import express from "express";
import dotenv from "dotenv/config";
import bcrypt from "bcrypt";
import Token from "jsonwebtoken";
import { validationResult } from "express-validator";

// Data-Base Models/Collections
import User from "../models/UserSchema.js";
import Post from "../models/PostSchema.js";
import {
  getUserPosts,
  getUserAndTheirFriendsPosts,
} from "../functions/postQueries.js";
import { getFriends } from "../functions/getFriends.js";

const error = 400;

export const user = async (req, res) => {
  const userId = req.body.id;
  const user = await User.findOne({ _id: userId });
  const userPosts = await getUserAndTheirFriendsPosts(userId);
  const friends = await getFriends(user.followers, user.following);

  if (user) {
    return res.status(200).send({
      verified: true,
      id: user._id,
      username: user.username,
      name: user.name,
      description: user.description,
      followers: user.followers,
      following: user.following,
      mode: user.mode,
      posts: userPosts,
      friends: friends,
      city: user.city,
      country: user.country,
    });
  }
};

export const login = async (req, res) => {
  const validateErr = validationResult(req);
  if (!validateErr.isEmpty()) {
    return res.status(error).json({ errors: validateErr[0] });
  }
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username: username });

  // check if the username does exist in the database
  if (!user) {
    return res.status(error).send({
      error: `no user is found with this username ${username}`,
    });
  }

  const userPosts = await getUserAndTheirFriendsPosts(user._id);
  const friends = await getFriends(user.followers, user.following);

  // console.log("userController.js, login function, user posts", userPosts);
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(error).send({ error: "error, please try again later" });
    }
    if (result !== true) {
      return res.status(error).send({
        error: "password is wrong, please try again",
      });
    }
    // generate token and add it to headers response
    try {
      const token = getToken(user._id);
      return setTimeout(
        () =>
          res
            .status(200)
            .set({
              "Access-Control-Expose-Headers": "Authorization",
              Authorization: "Bearer " + token,
            })
            .send({
              id: user._id,
              username: user.username,
              mode: user.mode,
              name: user.name,
              description: user.description,
              followers: user.followers,
              following: user.following,
              posts: userPosts,
              friends: friends,
              city: user.city,
              country: user.country,
            }),
        2000
      );
    } catch (err) {
      console.error(err);
    }
  });
};

export const signup = async (req, res) => {
  const validateErr = validationResult(req);
  if (!validateErr.isEmpty()) {
    return res.status(error).json({ error: error });
  }

  const username = req.body.username;
  const password = req.body.password;
  const repeat_password = req.body.repeat_password;

  if (repeat_password !== password) {
    return res.status(error).send({ error: "passwords doesn't match" });
  }

  // hash the password
  const hashedPassword = hashPassword(password);
  if (!hashedPassword) {
    return res.status(error).send({ error: "Error, please try again later" });
  }
  // store the user with the hashed password in the database
  const newUser = await new User({
    username: username,
    password: hashedPassword,
  });

  newUser.save((err) => {
    if (err) {
      return res.status(error).send({ errors: [err.message] });
    }
    // generate token and add it to headers response
    try {
      const token = getToken(newUser._id, username);
      return res
        .set({
          "Access-Control-Expose-Headers": "Authorization",
          Authorization: "Bearer " + token,
        })
        .send({
          id: newUser._id,
          username: newUser.username,
          name: "",
          description: "",
          followers: 0,
          following: 0,
        });
    } catch (err) {
      return res.status(error).send({ error: err });
    }
  });
};

export const updateStore = async (req, res) => {
  const user = await User.findOne(
    { _id: req.body.id },
    { followers: 1, following: 1 }
  );
  const friends = await getFriends(user.followers, user.following);
  console.log(req.body);
  const profilePosts = req.body.profileId
    ? await getUserPosts(req.body.profileId)
    : "";
  const userPosts = await getUserAndTheirFriendsPosts(req.body.id);
  const post =
    req.body.postId !== ""
      ? await Post.findOne({ _id: req.body.postId }).populate(
          "author comments.commentAuthor"
        )
      : "";

  return res.status(200).send({
    followers: user.followers,
    post: post,
    profilePosts: profilePosts,
    userPosts: userPosts,
    friends: friends,
  });
};

export const updateMode = async (req, res) => {
  const mode = req.body.mode;

  return await User.updateOne(
    { _id: req.body.id },
    {
      $set: { mode: mode },
      $currentDate: { lastModified: true },
    }
  )
    .then(() => {
      res.status(200).send("mode changed");
    })
    .catch((err) => {
      res.status(error).send({
        error: "couldn't update the mode, please try again later",
      });
    });
};

export const getUsersByName = async (req, res) => {
  const users = await User.find({ username: { $regex: req.body.username } });
  // console.log("usercontroler line 161", users);
  return res.status(200).send({ users: users });
};

export const profile = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const userPosts = await getUserPosts(req.params.id);

  return res.status(200).send({
    id: user._id,
    username: user.username,
    name: user.name,
    description: user.description,
    followers: user.followers,
    following: user.following,
    posts: userPosts,
  });
};

export const editProfile = async (req, res) => {
  console.log("edit profile the req", req.body);
  await User.updateOne(
    { _id: req.body.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        country: req.body.country,
      },
    }
  );

  const updatedUser = await User.findOne({ _id: req.body.id });
  try {
    res.status(200).send(updatedUser);
  } catch {
    (err) => res.status(400).send("error");
  }
};

export const createPost = async (req, res) => {
  const validateErr = validationResult(req);
  if (!validateErr.isEmpty()) {
    return res.status(error).json({ errors: validateErr[0] });
  }

  const user = await User.findOne({ _id: req.body.id });

  if (!user) {
    res.status(401).send("error");
  }

  const newPost = new Post({
    author: user._id,
    post: req.body.post,
    date: Date.now(),
  });
  try {
    newPost
      .save()
      .then(() => getUserAndTheirFriendsPosts(req.body.id))
      .then((posts) => res.status(200).send({ posts: posts }));
  } catch {
    (err) => console.log(err);
  }
};

export const follow = async (req, res) => {
  const follower = await User.findOne({
    _id: req.body.id,
  });
  const followed = await User.findOne({
    _id: req.body.followedId,
  });

  if (!follower || !followed) {
    return res.status(400).send("error");
  } else if (
    !follower.following.includes(req.body.followedId) &&
    !followed.followers.includes(req.body.id)
  ) {
    follower.following.push(req.body.followedId);
    followed.followers.push(req.body.id);
  } else {
    follower.following = follower.following.filter((followed) => {
      if (followed) {
        return followed.toString() !== req.body.followedId;
      }
    });
    followed.followers = followed.followers.filter((follower) => {
      if (follower) {
        return follower.toString() !== req.body.id;
      }
    });
  }
  try {
    await follower.save();
    await followed.save();
    const updatedfollowers = await User.findOne(
      {
        _id: req.body.followedId,
      },
      { followers: 1 }
    );
    const updatedfollowing = await User.findOne(
      {
        _id: req.body.id,
      },
      { following: 1 }
    );
    return res.status(200).send({
      updatedfollowers: updatedfollowers.followers,
      updatedfollowing: updatedfollowing.following,
    });
  } catch {
    (err) => res.status(400).send("error");
  }
  return;
};

// create token for the user
function getToken(id) {
  return Token.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "7d",
  });
}

function hashPassword(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}
