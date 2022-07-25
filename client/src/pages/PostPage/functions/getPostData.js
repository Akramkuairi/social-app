import { axiosConfiguration } from "../../../functions/axiosConfig";
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { setPost } from "../../../redux/postReducer";
import { store } from "../../../redux/store";

export const getPostData = async (id) => {
  const axiosConfig = axiosConfiguration();
  store.dispatch(loading());
  axiosConfig
    .get(`/post/${id}`)
    .then((res) => {
      store.dispatch(
        setPost({
          id: id,
          author: res.data.author,
          post: res.data.post,
          likes: res.data.likes,
          comments: res.data.comments,
          date: res.data.date,
        })
      );
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(stopLoading());
    });
};
