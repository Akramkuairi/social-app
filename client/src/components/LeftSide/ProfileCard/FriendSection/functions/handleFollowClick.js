import { axiosConfiguration } from "../../../../../functions/axiosConfig";
import { loading, stopLoading } from "../../../../../redux/loadingReducer";
import { updateProfileFollowers } from "../../../../../redux/profileReducer";
import { store } from "../../../../../redux/store";
import { updateFollowing } from "../../../../../redux/userReducer";

export const handleFollowClick = (e, followedId) => {
  e.preventDefault();
  store.dispatch(loading());
  const axiosConfig = axiosConfiguration();
  axiosConfig
    .post("/user/follow", {
      followedId: followedId,
    })
    .then((res) => {
      console.log(res.data);
      store.dispatch(updateProfileFollowers(res.data.updatedfollowers));
      store.dispatch(updateFollowing(res.data.updatedfollowing));
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(stopLoading());
    });

  return;
};
