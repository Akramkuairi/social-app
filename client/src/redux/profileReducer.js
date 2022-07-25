// Libraries and Packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  name: "",
  description: "",
  followers: [],
  following: [],
  posts: [],
  isFollowed: false,
  city: "",
  country: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setProfile: (state, action) => {
      console.log(action.payload);
      const {
        id,
        username,
        name,
        description,
        followers,
        following,
        posts,
        isFollowed,
        city,
        country,
      } = action.payload;
      return {
        id: id,
        username: username,
        name: name,
        description: description,
        followers: followers,
        following: following,
        posts: posts,
        isFollowed: isFollowed,
        city: city,
        country: country,
      };
    },

    updateProfileUserProfile: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        city: action.payload.city,
        country: action.payload.country,
      };
    },
    updateProfilePosts: (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    updateProfileFollowers: (state, action) => {
      return {
        ...state,
        followers: action.payload,
      };
    },
    updateProfileFollowing: (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        following: action.payload,
      };
    },
  },
});

export const {
  setProfile,
  updateProfileUserProfile,
  updateProfilePosts,
  updateProfileFollowers,
  updateProfileFollowing,
} = profileSlice.actions;
export default profileSlice.reducer;
