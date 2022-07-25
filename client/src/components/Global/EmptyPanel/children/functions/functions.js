import { closePanel } from "../../../../../redux/panelReducer";
import { store } from "../../../../../redux/store";

export const defualtCancelSubmitBtn = () => {
  store.dispatch(closePanel());
};
