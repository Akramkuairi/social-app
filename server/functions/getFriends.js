import User from "../models/UserSchema.js";

export const getFriends = async (followers, following) => {
  const friends = [];
  followers.map((follower) =>
    following.map((follow) => {
      follower.toString() === follow.toString()
        ? friends.push(follower)
        : follower;
      console.log(follower, follow);
    })
  );
  const populatedFriends = await User.find(
    { _id: { $in: friends } },
    { username: 1, name: 1 }
  );
  return populatedFriends;
};
