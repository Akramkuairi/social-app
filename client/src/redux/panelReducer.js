import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPanel: false,
  type: "profile",
};

const panelSlice = createSlice({
  name: "panel",
  initialState: initialState,
  reducers: {
    setPanel: (state, action) => {
      return {
        isPanel: true,
        type: action.payload,
      };
    },

    closePanel: () => {
      return initialState;
    },
  },
});

export const { setPanel, closePanel } = panelSlice.actions;

export default panelSlice.reducer;
