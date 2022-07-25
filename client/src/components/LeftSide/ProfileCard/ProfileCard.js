// CSS
import "./ProfileCard.css";

import React, { useEffect, useState } from "react";

// imgs
import profilePicture from "../../../imgs/pp.png";
import { useSelector } from "react-redux";
import { FriendsSection } from "./FriendSection/FriendSection";
import { UserSection } from "./UserSection/UserSection";
import { Link } from "react-router-dom";
import { ProfilePage } from "../../../pages/ProfilePage/ProfilePage";

export const ProfileCard = () => {
  const { user, profile, currentPage } = useSelector((state) => state);
  const [profileInfo, setProfileInfo] = useState({});
  const [child, setChild] = useState();

  useEffect(() => {
    switch (currentPage.currentPage) {
      case "profilePage":
        setProfileInfo(profile);
        if (user.id === profile.id) {
          setChild(<UserSection />);
        } else {
          setChild(<FriendsSection />);
        }
        break;
      default:
        setProfileInfo(user);
        setChild();
    }
  }, [user, profile, currentPage]);
  console.log(profileInfo);
  return (
    <Link to={`/profile/${profileInfo.id}`} elemente={<ProfilePage />}>
      <div className="ProfileCard">
        <div className="info">
          <div className="profilePicBorder">
            <img src={profilePicture} alt="profile" className="profilePic" />
          </div>
          <h3>@{profileInfo.username || ""}</h3>
          <h5>{profileInfo.name || ""}</h5>
          <p>{profileInfo.description || ""} </p>
        </div>
        <div className="secondHalf flex">
          <div className="styleLine"></div>
          <div className="follow followers">
            <h3>followers</h3>
            <h4>{profileInfo.followers ? profileInfo.followers.length : 0}</h4>
          </div>
          <div className="styleLine"></div>
          <div className="follow following">
            <h3>following</h3>
            <h4>{profileInfo.following ? profileInfo.following.length : 0}</h4>
          </div>
        </div>
        <div className="profileSection">{child}</div>
      </div>
    </Link>
  );
};
