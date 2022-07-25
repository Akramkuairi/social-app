import { setPanel } from "../../../../../../redux/panelReducer";
import { store } from "../../../../../../redux/store";

export const handleEditPost = () => {
  return store.dispatch(setPanel("editPost"));
};
