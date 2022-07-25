import { setPanel } from "../../../../../../redux/panelReducer";
import { store } from "../../../../../../redux/store";

export const handleDeletePost = () => {
  return store.dispatch(setPanel("deletePost"));
};
