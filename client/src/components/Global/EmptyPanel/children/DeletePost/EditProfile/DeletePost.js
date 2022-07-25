import { SubmitBtns } from "../../../../SubmitBtns/SubmitBtns";
import { defualtCancelSubmitBtn } from "../../functions/functions";
import { submitDeletePost } from "./submitDeletePost";
import "./DeletePost.css";

export const DeletePost = () => {
  return (
    <div className="DeletePost flex">
      <h4>Are you sure you want to delete this post?</h4>
      <SubmitBtns submit={submitDeletePost} cancel={defualtCancelSubmitBtn} />
    </div>
  );
};
