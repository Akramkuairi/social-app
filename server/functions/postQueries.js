import Post from "../models/PostSchema.js";
import User from "../models/UserSchema.js";

export const getUserPosts = async (id) => {
  const userPosts = await Post.find({ author: id }).populate("author");
  return userPosts.reverse();
};

export const getUserAndTheirFriendsPosts = async (id) => {
  const userFollowing = await User.findOne({ _id: id }, { following: 1 });
  const userHomePagePosts = await Post.find({
    author: { $in: [...(userFollowing.following || []), id] },
  }).populate("author");

  return userHomePagePosts.reverse();
};
