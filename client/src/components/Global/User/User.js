import profilePicture from "../../../imgs/pp.png";
import "./User.css";
export const User = (props) => {
  return (
    <div className="User flex row">
      <img src={profilePicture} alt="" className="profilePicture" />
      <div className="info">
        <h3>@{props.username}</h3>
        <h5>{props.name || "user"}</h5>
      </div>
    </div>
  );
};
