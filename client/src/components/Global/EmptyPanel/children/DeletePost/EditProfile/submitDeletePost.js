import { axiosConfiguration } from "../../../../../../functions/axiosConfig";
import { loading, stopLoading } from "../../../../../../redux/loadingReducer";
import { deleteOptionMenu } from "../../../../../../redux/optionMenuReducer";
import { closePanel } from "../../../../../../redux/panelReducer";
import { updateProfilePosts } from "../../../../../../redux/profileReducer";
import { store } from "../../../../../../redux/store";
import { setNotification } from "../../../../../../redux/subNotificationReducer";
import { updatePosts } from "../../../../../../redux/userReducer";

export const submitDeletePost = () => {
  store.dispatch(closePanel());
  store.dispatch(loading());
  const axiosConfig = axiosConfiguration();
  const state = store.getState();
  axiosConfig
    .delete(`/post/${state.optionMenu.id}`)
    .then(() => {
      if (state.currentPage.currentPage === "postPage") {
        return (window.location.href = "/");
      }
      store.dispatch(
        updatePosts(
          state.user.posts.filter((post) => post._id !== state.optionMenu.id)
        )
      );

      store.dispatch(
        updateProfilePosts(
          state.profile.posts.filter((post) => post._id !== state.optionMenu.id)
        )
      );
    })
    .then(() => {
      store.dispatch(stopLoading());
      store.dispatch(setNotification({ msg: "deleted", status: "success" }));
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(stopLoading());
    });
};
