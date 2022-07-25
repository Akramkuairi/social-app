import "./Chat.css";
import { User } from "../../Global/User/User";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Chat = () => {
  const { friends } = useSelector((state) => state.user);
  return (
    <div className="Chat">
      {friends
        ? friends.map((friend) => (
            <Link to={`/profile/${friend._id}`}>
              <User username={friend.username} name={friend.name} />
            </Link>
          ))
        : ""}
    </div>
  );
};
