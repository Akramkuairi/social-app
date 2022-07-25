import "./UserSection.css";
import { handleEditProfile } from "./functions/handleEditProfile";
export const UserSection = () => {
  return (
    <div className="UserSection">
      <button className="editProfile" onClick={(e) => handleEditProfile(e)}>
        Edit
      </button>
    </div>
  );
};
