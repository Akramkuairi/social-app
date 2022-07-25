// using setInterval to update the store each couple seconds
// is the worst structure when it comes to clean coding and
// app preformance

// CSS
import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Global/Navbar/Navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { login, logout } from "./redux/userReducer";

import { axiosConfiguration } from "./functions/axiosConfig";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginPage } from "./pages/Authentication/LoginPage/LoginPage";
import { SubNotification } from "./components/Global/SubNotification/SubNotification";
import { setNotification } from "./redux/subNotificationReducer";

import { LoadingPage } from "./pages/LoadingPage/LoadingPage";
import { loading as loadingReducer, stopLoading } from "./redux/loadingReducer";
import { switchMode } from "./components/Global/Navbar/Mode";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { PostPage } from "./pages/PostPage/PostPage";
import { EmptyPanel } from "./components/Global/EmptyPanel/EmptyPanel";

import lightBg from "./imgs/light-mode.jpg";
import darkBg from "./imgs/dark-mode.jpg";
import { SignUpPage } from "./pages/Authentication/SignUpPage/SignUpPage";
import { updateStore } from "./functions/updateStore";

function App() {
  const axiosConfig = axiosConfiguration();
  const dispatch = useDispatch();
  const { user, loading, panel } = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadingReducer());
    updateStore();
    switchMode(localStorage.getItem("mode"));
    axiosConfig
      .get("/user")
      .then((res) => {
        if (res.data.verified) {
          dispatch(
            login({
              id: res.data.id,
              username: res.data.username,
              mode: res.data.mode || "dark",
              token: localStorage.getItem("token"),
              name: res.data.name,
              description: res.data.description,
              followers: res.data.followers,
              following: res.data.following,
              posts: res.data.posts,
              friends: res.data.friends,
              city: res.data.city,
              country: res.data.country,
            })
          );
          dispatch(
            setNotification({
              msg: `Welcome ${res.data.username}`,
              status: "success",
            })
          );
        } else {
          dispatch(
            setNotification({
              msg: "error, please try again later",
              status: "error",
            })
          );
        }
        return dispatch(stopLoading());
      })
      .catch((err) => {
        dispatch(logout());
        dispatch(stopLoading());
      });
  }, []);
  return (
    <Router>
      <div className="App">
        <div
          className="bg"
          style={{
            position: "fixed",
            top: "0",
            height: "100vh",
            width: "100vw",
            transition: "0.6s",
            backgroundSize: "cover",
            backgroundImage: `url(${user.mode === "light" ? lightBg : darkBg})`,
          }}
        ></div>
        <SubNotification />
        {user.isLoggedIn ? <Navbar /> : ""}
        {loading.isLoading ? <LoadingPage /> : ""}
        {panel.isPanel ? <EmptyPanel /> : ""}
        <div
          className="PageWrapper"
          style={{
            filter:
              panel.isPanel || loading.isLoading ? "blur(5px)" : "blur(0)",
            transition: "0.2s",
          }}
        >
          <Routes>
            <Route
              index
              element={
                user.isLoggedIn ? <HomePage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={user.isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={user.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
            />
            <Route
              path="/profile/:id"
              element={user.isLoggedIn ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/post/:id"
              element={user.isLoggedIn ? <PostPage /> : <Navigate to="/" />}
            />
            <Route path="*" element="404, Page Not Found" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
