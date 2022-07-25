import axios from "axios";
import { store } from "../redux/store";

const url = "http://localhost:4200";

const token = () =>
  store.getState().user.token || localStorage.getItem("token");

export const axiosConfiguration = () =>
  axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token(),
    },
  });

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
