import { SubmitBtns } from "../../../SubmitBtns/SubmitBtns";
import { defualtCancelSubmitBtn } from "../functions/functions";
import { submitEditProfile } from "./submitEditProfile";
import "./EditProfile.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { useEffect } from "react";

export const EditProfile = () => {
  const { user } = useSelector((state) => state);
  // console.log("EditProfile.js line 11, user", user);
  useEffect(() => {}, [user]);

  return (
    <div className="EditProfile flex">
      <div className="name flex">
        <label htmlFor="name">Name</label>
        <input type="text" defaultValue={user.name || "Name..."} id="name" />
      </div>
      <div className="description flex">
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          defaultValue={user.description || "Description..."}
        ></textarea>
      </div>
      <div className="city flex">
        <label htmlFor="city">City</label>
        <input type="text" defaultValue={user.city || "City..."} id="city" />
      </div>
      <div className="country flex">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          defaultValue={user.country || "Country..."}
          id="country"
        />
      </div>
      <SubmitBtns submit={submitEditProfile} cancel={defualtCancelSubmitBtn} />
    </div>
  );
};
