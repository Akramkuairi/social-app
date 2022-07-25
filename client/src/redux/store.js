import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";

import subNotificationReducer from "./subNotificationReducer";
import optionMenuReducer from "./optionMenuReducer";
import searchReducer from "./searchReducer";
import profileReducer from "./profileReducer";
import currrentPageReducer from "./currentPageReducer";
import postReducer from "./postReducer";
import panelReducer from "./panelReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subNotification: subNotificationReducer,
    loading: loadingReducer,
    optionMenu: optionMenuReducer,
    search: searchReducer,
    profile: profileReducer,
    post: postReducer,
    panel: panelReducer,
    currentPage: currrentPageReducer,
  },
});
