// Libraries and Packages
import { createSlice } from "@reduxjs/toolkit";

// Functions
import { setCookie, deleteCookies } from "../functions/Cookies";

const initialState = {
  isLoggedIn: false,
  id: "",
  username: "",
  name: "",
  mode: "dark",
  description: "",
  followers: [],
  following: [],
  posts: [],
  friends: [],
  city: "",
  country: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const {
        id,
        username,
        name,
        token,
        mode,
        description,
        followers,
        following,
        posts,
        friends,
        city,
        country,
      } = action.payload;
      setCookie(["username", username], ["token", token]);
      return {
        isLoggedIn: true,
        id: id,
        username: username,
        name: name,
        token: token,
        mode: mode || "dark",
        description: description,
        followers: followers,
        following: following,
        posts: posts,
        friends: friends,
        city: city,
        country: country,
      };
    },
    logout: () => {
      deleteCookies();
      return { initialState };
    },
    updateUserProfile: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        city: action.payload.city,
        country: action.payload.country,
      };
    },
    updateMode: (state, action) => {
      setCookie(["mode", action.payload]);
      return {
        ...state,
        mode: action.payload,
      };
    },
    updatePosts: (state, action) => {
      return {
        ...state,
        posts: [...action.payload],
      };
    },
    updateFollowers: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        followers: [...action.payload],
      };
    },
    updateFollowing: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        following: [...action.payload],
      };
    },
    updateFriends: (state, action) => {
      return {
        ...state,
        friends: [...action.payload],
      };
    },
  },
});

export const {
  login,
  logout,
  updateUserProfile,
  updateMode,
  updatePosts,
  updateFollowers,
  updateFollowing,
  updateFriends,
} = userSlice.actions;
export default userSlice.reducer;
