import { axiosConfiguration } from "../../../../../functions/axiosConfig";
import { updatePostPageLikes } from "../../../../../redux/postReducer";
import { updateProfilePosts } from "../../../../../redux/profileReducer";
import { store } from "../../../../../redux/store";
import { updatePosts } from "../../../../../redux/userReducer";

export const handleLikeClick = async (type, postId) => {
  const axiosConfig = axiosConfiguration();
  const reducerUserPosts = store.getState().user.posts;

  let profileId;

  if (type === "profilePage") {
    profileId = store.getState().profile.id;
  }

  return axiosConfig
    .post("/post/like", {
      postId: postId,
      profileId: profileId,
    })
    .then((res) => {
      const filteredUserPost = [];
      reducerUserPosts.map((post) =>
        res.data.userPosts.map((userPost) =>
          post._id === userPost._id ? filteredUserPost.push(userPost) : ""
        )
      );
      store.dispatch(updatePostPageLikes(res.data.likes));
      store.dispatch(updateProfilePosts(res.data.profilePosts));
      store.dispatch(updatePosts(filteredUserPost));
    })
    .catch((err) => console.error(err));
};
