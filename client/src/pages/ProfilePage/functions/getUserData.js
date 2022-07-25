import { axiosConfiguration } from "../../../functions/axiosConfig";
import { setCurrentPage } from "../../../redux/currentPageReducer";
import { loading, stopLoading } from "../../../redux/loadingReducer";
import { setProfile } from "../../../redux/profileReducer";
import { store } from "../../../redux/store";

export const getUserData = async (id) => {
  const axiosConfig = axiosConfiguration();
  store.dispatch(loading());
  axiosConfig
    .get(`/user/profile/${id}`)
    .then((res) => {
      store.dispatch(
        setProfile({
          id: res.data.id,
          username: res.data.username,
          name: res.data.name,
          description: res.data.description,
          followers: res.data.followers,
          following: res.data.following,
          posts: res.data.posts,
          isFollowed: res.data.isFollowed,
        })
      );
      store.dispatch(setCurrentPage("profilePage"));
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(stopLoading());
    });
  return;
};
