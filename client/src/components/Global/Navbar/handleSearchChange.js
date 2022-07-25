/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
import { deleteUsers, setUsers } from "../../../redux/searchReducer";
import { axiosConfiguration } from "../../../functions/axiosConfig";
import { store } from "../../../redux/store";

export const handleSearchChange = (input) => {
  console.log(input);
  if (input === "") {
    return store.dispatch(deleteUsers());
  }
  const axiosConfig = axiosConfiguration();
  axiosConfig
    .post("/user/username", { username: input })
    .then((res) => store.dispatch(setUsers(res.data.users)))
    .catch((err) => console.error(err));
};
