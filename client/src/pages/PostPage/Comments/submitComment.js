import { axiosConfiguration } from "../../../functions/axiosConfig";
import { qs } from "../../../functions/functions";
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { setPost } from "../../../redux/postReducer";
import { store } from "../../../redux/store";
import { setNotification } from "../../../redux/subNotificationReducer";

export const submitComment = (comment) => {
  store.dispatch(loading());
  const axiosConfig = axiosConfiguration();
  const state = store.getState();

  axiosConfig
    .post(`/post/new/comment/${state.post.id}`, {
      author: state.user.id,
      comment: comment,
    })
    .then((res) => {
      console.log(res.data);
      store.dispatch(
        setPost({
          id: res.data.id,
          author: res.data.author,
          post: res.data.post,
          likes: res.data.likes,
          comments: res.data.comments,
        })
      );
      store.dispatch(
        setNotification({
          msg: "commented",
          status: "success",
        })
      );
      qs(".addCommentInput").value = "";
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(stopLoading());
    });
  return;
};
