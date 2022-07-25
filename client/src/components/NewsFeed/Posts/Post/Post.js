import "./Post.css";
import { Link } from "react-router-dom";
import { User } from "../../../Global/User/User";
import { OptionMenu } from "./OptionMenu/OptionMenu";
import { useSelector } from "react-redux";
import { handleOptionMenuClick } from "./OptionMenu/functions/handleOptionMenuClick";
import { handleLikeClick } from "./functions/handleLikeClick";
import { LikeIcon } from "../../../../svgs/LikeIcon";
import { CommentIcon } from "../../../../svgs/CommentIcon.js";
import { calcPostTime } from "./functions/calcPostTime";

export const Post = (props) => {
  const { optionMenu, user } = useSelector((state) => state);

  const likeLength = props.post.likes.length;
  const result = {};
  if (props.post.likes.includes(user.id)) {
    if (likeLength === 1) {
      result.msg = `you`;
    } else {
      result.msg = `you and ${likeLength - 1} more`;
    }
    result.src = <LikeIcon fill="#fff" />;
  } else {
    result.msg = likeLength;
    result.src = <LikeIcon fill="#0000" />;
  }

  return (
    <div className="PostWrapper flex" key={props.post._id || props.post.id}>
      <figure className="postHeader flex row">
        <Link to={`/profile/${props.post.author._id}`}>
          <User
            username={props.post.author.username}
            name={props.post.author.name}
          />
          <div className="date">
            {props.post.date ? calcPostTime(props.post.date) : ""}
          </div>
        </Link>
        <div className="options">
          <button
            onClick={() =>
              handleOptionMenuClick(optionMenu, props.post._id || props.post.id)
            }
          >
            ...
          </button>
          {(optionMenu.id === props.post._id ||
            optionMenu.id === props.post.id) &&
          optionMenu.isOptionMenu === true &&
          props.post.author._id.toString() === user.id ? (
            <OptionMenu />
          ) : (
            <></>
          )}
        </div>
      </figure>
      <div className="postBody flex">
        <Link to={`/post/${props.post._id || props.post.id}`}>
          <article className="Post">{props.post.post}</article>
        </Link>
      </div>
      <div className="postFooter flex row">
        <div
          className="like flex row"
          onClick={() =>
            handleLikeClick(props.type, props.post._id || props.post.id)
          }
        >
          {/* <img src={result.src} alt="" className="likeIcon" fill="#000" /> */}
          {result.src}
          <h4>{result.msg}</h4>
        </div>

        <Link to={`/post/${props.post._id}`}>
          <div className="comment flex row">
            {/* <img src={commentSVG} alt="" /> */}
            <CommentIcon />
            <h4>{props.post.comments.length}</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};
