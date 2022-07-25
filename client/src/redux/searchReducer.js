import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearch: false,
  users: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      return {
        isSearch: action.payload === [] ? false : true,
        users: action.payload || [],
      };
    },
    deleteUsers: () => {
      return initialState;
    },
  },
});

export const { setUsers, deleteUsers } = searchSlice.actions;
export default searchSlice.reducer;
