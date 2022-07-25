import { MakePost } from "./MakePost/MakePost";
import { Posts } from "./Posts/Posts";
import "./NewsFeed.css";

export const NewsFeed = (props) => {
  return (
    <div className="NewsFeed comp">
      <MakePost />
      <Posts />
    </div>
  );
};
