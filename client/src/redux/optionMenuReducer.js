import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOptionMenu: false,
  id: "",
};

const optionMenuSlice = createSlice({
  name: "optionMenu",
  initialState: initialState,
  reducers: {
    setOptionMenu: (state, action) => {
      return {
        isOptionMenu: true,
        id: action.payload.id,
      };
    },
    deleteOptionMenu: (state, action) => {
      return initialState;
    },
  },
});

export const { setOptionMenu, deleteOptionMenu } = optionMenuSlice.actions;

export default optionMenuSlice.reducer;
