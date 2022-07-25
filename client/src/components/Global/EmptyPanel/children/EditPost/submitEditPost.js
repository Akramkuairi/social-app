import { axiosConfiguration } from "../../../../../functions/axiosConfig";
import { qsev } from "../../../../../functions/functions";
import { loading, stopLoading } from "../../../../../redux/loadingReducer";
import { closePanel } from "../../../../../redux/panelReducer";
import { setPost } from "../../../../../redux/postReducer";
import { updateProfilePosts } from "../../../../../redux/profileReducer";
import { store } from "../../../../../redux/store";
import { updatePosts } from "../../../../../redux/userReducer";

export const submitEditPost = () => {
  store.dispatch(closePanel());
  store.dispatch(loading());

  const axiosConfig = axiosConfiguration();
  const editedPost = qsev("#editPost");
  const postId = store.getState().optionMenu.id;
  console.log("updating");
  axiosConfig
    .put(`/post/${postId}`, {
      editedPost: editedPost,
    })
    .then((res) => {
      store.dispatch(setPost(res.data.post));
      store.dispatch(updateProfilePosts(res.data.profilePosts));
      store.dispatch(updatePosts(res.data.userPosts));
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(stopLoading());
    });
};
