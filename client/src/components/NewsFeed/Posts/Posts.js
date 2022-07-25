import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Post } from "./Post/Post";
import "./Posts.css";

export const Posts = () => {
  const { user, profile, currentPage } = useSelector((state) => state);
  const [posts, setProfileInfo] = useState([]);

  useEffect(() => {
    switch (currentPage.currentPage) {
      case "profilePage":
        setProfileInfo(profile.posts);
        break;
      default:
        setProfileInfo(user.posts);
    }
  }, [user, profile, currentPage]);

  return (
    <div className="Posts">
      {posts
        ? posts.map((post) => (
            <Post post={post} type={currentPage.currentPage} />
          ))
        : ""}
    </div>
  );
};
