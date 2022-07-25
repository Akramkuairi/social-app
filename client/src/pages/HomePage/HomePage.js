// CSS
import "./HomePage.css";

import React, { useEffect } from "react";

// Components
import { Weather } from "../../components/LeftSide/Weather/Weather";
import { LeftSide } from "../../components/LeftSide/LeftSide";
import { RightSide } from "../../components/RightSide/RightSide";
import { NewsFeed } from "../../components/NewsFeed/NewsFeed";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/currentPageReducer";
import { deleteOptionMenu } from "../../redux/optionMenuReducer";

const HomePage = () => {
  const { user, currentPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentPage.currentPage !== "homePage") {
      dispatch(setCurrentPage("homePage"));
    }
    dispatch(deleteOptionMenu());
  }, [currentPage]);
  return (
    <div className="HomePage">
      <LeftSide userProfile={user} children={<Weather />} />
      <NewsFeed posts={user.posts} type="homePage" />
      <RightSide />
    </div>
  );
};

export default HomePage;
