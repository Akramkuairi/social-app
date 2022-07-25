import "./OptionMenu.css";
import { handleDeletePost } from "./functions/handleDeletePost";
import { handleEditPost } from "./functions/handleEditPost";

export const OptionMenu = () => {
  return (
    <div className="OptionMenu">
      <button className="edit" onClick={() => handleEditPost()}>
        Edit
      </button>
      <button className="delete" onClick={() => handleDeletePost()}>
        Delete
      </button>
    </div>
  );
};
