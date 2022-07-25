// Redux
import { store } from "../../../../redux/store";
import { loading, stopLoading } from "../../../../redux/loadingReducer";

// Reducers
import { login } from "../../../../redux/userReducer";
import { axiosConfiguration } from "../../../../functions/axiosConfig";
import { setNotification } from "../../../../redux/subNotificationReducer";

export const signupUser = async (data) => {
  const axiosConfig = axiosConfiguration();
  store.dispatch(loading());
  if (
    data.username === "" ||
    data.password === "" ||
    data.repeat_password === ""
  ) {
    store.dispatch(
      setNotification({
        msg: "you should fill all fields",
        status: "error",
      })
    );

    store.dispatch(stopLoading());
  }

  axiosConfig
    .post("/user/signup", data)
    .then((res) => {
      const token = res.headers.authorization.split(" ")[1];
      store.dispatch(
        login({
          id: res.data.id,
          username: res.data.username,
          token: res.data.token,
          mode: res.data.mode,
          name: res.data.name,
          description: res.data.description,
          followers: res.data.followers,
          following: res.data.following,
          city: "",
          country: "",
        })
      );
      store.dispatch(
        setNotification({
          msg: `Welcome ${res.data.username}`,
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
};
