import { store } from "../redux/store";
import { removeNotification } from "../redux/subNotificationReducer";

export const callRemoveNotification = () => {
  setTimeout(() => {
    store.dispatch(removeNotification());
  }, 4.4 * 1000);
};
