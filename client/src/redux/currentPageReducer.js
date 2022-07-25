import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "homePage",
};

const currentPageSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      return {
        currentPage: action.payload,
      };
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
