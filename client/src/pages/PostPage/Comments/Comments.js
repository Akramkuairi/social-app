import { User } from "../../../components/Global/User/User";
import { qsev } from "../../../functions/functions";
import publishComment from "../../../svgs/publishComment.svg";
import "./Comments.css";
import { submitComment } from "./submitComment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Comments = () => {
  const { comments } = useSelector((state) => state.post);
  console.log(comments);
  return (
    <div className="Comments flex">
      {comments
        ? comments.map((comment) => (
            <div className="comment flex">
              <Link to={`/profile/${comment.commentAuthor._id}`}>
                <User
                  username={comment.commentAuthor.username}
                  name={comment.commentAuthor.name}
                />
              </Link>
              <h5>{comment.comment}</h5>
            </div>
          ))
        : ""}
      <div className="addComment flex row">
        <input
          type="text"
          placeholder="add comment ..."
          className="addCommentInput"
        />
        <button
          className="submitComment"
          onClick={() => submitComment(qsev(".addCommentInput"))}
        >
          <img src={publishComment} alt="" />
        </button>
      </div>
    </div>
  );
};
