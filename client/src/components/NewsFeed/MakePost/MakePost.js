import { qsev } from "../../../functions/functions";
import { createPost } from "./functions/functions";
import "./MakePost.css";

export const MakePost = () => {
  return (
    <div className="MakePost flex">
      <h4>New Post</h4>
      <textarea
        className="postInput"
        placeholder="What are you thinking about?!"
      ></textarea>
      <button
        onClick={() => createPost(qsev(".postInput"))}
        className="btn postBtn"
      >
        Post
      </button>
    </div>
  );
};
