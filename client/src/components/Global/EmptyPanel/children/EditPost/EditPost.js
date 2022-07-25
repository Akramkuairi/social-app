import { SubmitBtns } from "../../../SubmitBtns/SubmitBtns";
import { defualtCancelSubmitBtn } from "../functions/functions";
import { submitEditPost } from "./submitEditPost";
import "./EditPost.css";
import { useSelector } from "react-redux";

export const EditPost = () => {
  const { user, optionMenu } = useSelector((state) => state);
  const post = user.posts.filter((post) => post._id === optionMenu.id)[0];

  return (
    <div className="EditPost flex">
      <div className="container flex">
        <label htmlFor="editPost">EditPost</label>
        <textarea className="Post" id="editPost">
          {post ? post.post : ""}
        </textarea>
      </div>
      <SubmitBtns submit={submitEditPost} cancel={defualtCancelSubmitBtn} />
    </div>
  );
};
