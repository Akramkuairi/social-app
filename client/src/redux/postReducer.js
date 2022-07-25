// Libraries and Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  author: {},
  post: "",
  likes: [],
  comments: [],
  date: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPost: (state, action) => {
      return {
        id: action.payload.id,
        author: { ...action.payload.author },
        post: action.payload.post,
        likes: [...action.payload.likes],
        comments: [...action.payload.comments],
        date: action.payload.date,
      };
    },
    updateComments: (state, action) => {
      return {
        ...state,
        comments: [...action.payload],
      };
    },
    updatePostPageLikes: (state, action) => {
      return {
        ...state,
        likes: [...action.payload],
      };
    },
  },
});

export const { setPost, updateComments, updatePostPageLikes } =
  postSlice.actions;
export default postSlice.reducer;
