// import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post } from "../../components/NewsFeed/Posts/Post/Post";
import { setCurrentPage } from "../../redux/currentPageReducer";
import { deleteOptionMenu } from "../../redux/optionMenuReducer";
import { Comments } from "./Comments/Comments";
import { getPostData } from "./functions/getPostData";

import "./PostPage.css";

export const PostPage = () => {
  console.log("hello from post");
  const { post, currentPage } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.id === "" || post.id !== id) {
      getPostData(id);
    }
    dispatch(setCurrentPage("postPage"));
    dispatch(deleteOptionMenu());
  }, [post]);

  return (
    <div className="PostPage">
      <Post post={post} type={currentPage.currentPage} />
      <Comments />
    </div>
  );
};
