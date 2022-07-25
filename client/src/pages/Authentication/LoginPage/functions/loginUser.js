// Redux
import { store } from "../../../../redux/store";
import { loading, stopLoading } from "../../../../redux/loadingReducer";
// Reducers
import { login } from "../../../../redux/userReducer";
import { axiosConfiguration } from "../../../../functions/axiosConfig";
import { setNotification } from "../../../../redux/subNotificationReducer";
import { switchMode } from "../../../../components/Global/Navbar/Mode";

export const loginUser = async (data) => {
  const axiosConfig = axiosConfiguration();

  store.dispatch(loading());
  if (data.username === "" || data.password === "") {
    store.dispatch(stopLoading());
  }
  axiosConfig
    .post("/user/login", data)
    .then((res) => {
      const token = res.headers.authorization.split(" ")[1];
      switchMode(res.data.mode);
      console.log(res);
      store.dispatch(
        login({
          id: res.data.id,
          token: token,
          username: res.data.username,
          mode: res.data.mode,
          name: res.data.name,
          description: res.data.description,
          followers: res.data.followers,
          following: res.data.following,
          posts: res.data.posts,
          friends: res.data.friends,
          city: res.data.city,
          country: res.data.country,
        })
      );
      store.dispatch(
        setNotification({
          msg: `Hello ${res.data.username}`,
          status: "success",
        })
      );
      store.dispatch(stopLoading());
    })
    .catch((err) => {
      store.dispatch(
        setNotification({
          msg: "error, please try again later",
          status: "error",
        })
      );
      store.dispatch(stopLoading());
    });
  return;
};
