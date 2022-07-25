import { useSelector } from "react-redux";
import { handleFollowClick } from "./functions/handleFollowClick";
import follow from "../../../../svgs/follow.svg";
import followed from "../../../../svgs/followed.svg";
import friends from "../../../../svgs/friends.svg";
import "./FriendsSection.css";
import { useEffect, useState } from "react";

export const FriendsSection = () => {
  const { user, profile } = useSelector((state) => state);

  const [followingIcon, setFollowingIcon] = useState(follow);

  useEffect(() => {
    if (user.following.includes(profile.id)) {
      if (profile.following.includes(user.id)) {
        console.log(user.following, profile.id);
        return setFollowingIcon(friends);
      } else {
        return setFollowingIcon(followed);
      }
    } else {
      return setFollowingIcon(follow);
    }
  }, [user, profile]);
  return (
    <div className="FriendsSection flex row">
      <button
        className="follow"
        onClick={(e) => handleFollowClick(e, profile.id)}
      >
        <img src={followingIcon} alt="" />
      </button>
    </div>
  );
};
