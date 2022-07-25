// Libraries and Packages
import { createSlice } from "@reduxjs/toolkit";
import { qsac } from "../functions/functions";
import { callRemoveNotification } from "../functions/helpers";

const initialState = {
  isNotification: false,
  msg: "",
  status: "",
};

const NotificationSlice = createSlice({
  name: "subNotification",
  initialState: initialState,
  reducers: {
    setNotification: (state, action) => {
      const { msg, status } = action.payload;
      callRemoveNotification();
      return {
        isNotification: true,
        msg: msg,
        status: status,
      };
    },
    removeNotification: () => {
      return { initialState };
    },
  },
});

export const { setNotification, removeNotification } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
