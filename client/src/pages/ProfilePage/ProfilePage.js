// import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LeftSide } from "../../components/LeftSide/LeftSide";
import { NewsFeed } from "../../components/NewsFeed/NewsFeed";
import { RightSide } from "../../components/RightSide/RightSide";
import { setCurrentPage } from "../../redux/currentPageReducer";
import { deleteOptionMenu } from "../../redux/optionMenuReducer";
import { getUserData } from "./functions/getUserData";
import "./ProfilePage.css";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    if (profile.id !== id) {
      getUserData(id);
    }
    dispatch(setCurrentPage("profilePage"));
    dispatch(deleteOptionMenu());
  }, [id, profile]);

  return (
    <div className="ProfilePage">
      <LeftSide />
      <NewsFeed />
      <RightSide />
    </div>
  );
};
