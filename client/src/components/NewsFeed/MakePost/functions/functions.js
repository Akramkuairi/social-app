import { axiosConfiguration } from "../../../../functions/axiosConfig";
import { loading, stopLoading } from "../../../../redux/loadingReducer";
import { store } from "../../../../redux/store";
import { setNotification } from "../../../../redux/subNotificationReducer";
import { updatePosts } from "../../../../redux/userReducer";
import { qs } from "../../../../functions/functions";
import { updateProfilePosts } from "../../../../redux/profileReducer";

export const createPost = (post, type) => {
  const axiosConfig = axiosConfiguration();
  store.dispatch(loading());
  const currentPage = store.getState().currentPage.currentPage;
  const user = store.getState().user;
  const profileId = store.getState().profile.id;

  axiosConfig
    .post("/user/new/post", { post: post, type: currentPage })
    .then((res) => {
      if (currentPage === "profilePage" && user.id === profileId) {
        store.dispatch(
          updateProfilePosts(
            res.data.posts.filter((post) => post.author._id === user.id)
          )
        );
        store.dispatch(updatePosts(res.data.posts));
      } else {
        store.dispatch(updatePosts(res.data.posts));
      }
      qs(".postInput").value = "";
      store.dispatch(
        setNotification({
          msg: "Posted",
          status: "success",
        })
      );
    })
    .catch((err) => {
      store.dispatch(
        setNotification({
          msg: "error, please try again later",
          status: "error",
        })
      );
      console.error(err);
    });

  store.dispatch(stopLoading());
};
