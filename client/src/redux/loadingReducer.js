import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  msg: "",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    loading: (state, action) => {
      return {
        isLoading: true,
        msg: action.payload || "Loading",
      };
    },
    stopLoading: () => {
      return initialState;
    },
  },
});

export const { stopLoading, loading } = loadingSlice.actions;

export default loadingSlice.reducer;
