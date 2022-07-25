import { setPanel } from "../../../../../redux/panelReducer";
import { store } from "../../../../../redux/store";

export const handleEditProfile = (e) => {
  e.preventDefault();
  console.log("a");
  store.dispatch(setPanel("profile"));
};
