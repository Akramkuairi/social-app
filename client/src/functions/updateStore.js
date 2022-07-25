import { setPost } from "../redux/postReducer";
import { updateProfilePosts } from "../redux/profileReducer";
import { store } from "../redux/store";
import {
  updateFollowers,
  updateFriends,
  updatePosts,
} from "../redux/userReducer";
import { axiosConfiguration } from "./axiosConfig";

export const updateStore = () => {
  setTimeout(() => {
    setInterval(() => {
      const axiosConfig = axiosConfiguration();
      const state = store.getState();
      console.log(state);
      axiosConfig
        .post("/user/update/store", {
          postId: state.post.id,
          profileId: state.profile.id,
        })
        .then((res) => {
          console.log(res.data);
          const filteredUserPosts = [];
          state.user.posts.map((post) =>
            res.data.userPosts.map((userPost) =>
              post._id === userPost._id ? filteredUserPosts.push(userPost) : ""
            )
          );
          if (res.data.post) {
            store.dispatch(
              setPost({
                id: res.data.post._id,
                author: res.data.post.author,
                post: res.data.post.post,
                likes: res.data.post.likes,
                comments: res.data.post.comments,
                date: res.data.post.date,
              })
            );
          }
          if (res.data.profilePosts) {
            store.dispatch(updateProfilePosts(res.data.profilePosts));
          }
          store.dispatch(updateFriends(res.data.friends));
          store.dispatch(updatePosts(filteredUserPosts));
          store.dispatch(updateFollowers(res.data.followers));
        })
        .catch((err) => console.error(err));
    }, 1000 * 1.4);
  }, 1000 * 2);
};
