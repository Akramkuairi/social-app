import { ProfileCard } from "../LeftSide/ProfileCard/ProfileCard";
import "./LeftSide.css";

export const LeftSide = (props) => {
  return (
    <div className="LeftSide comp">
      <ProfileCard />
      {props.children}
    </div>
  );
};
