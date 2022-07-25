// CSS
import "./EmptyPanel.css";

// Functions
import { useSelector, useDispatch } from "react-redux";
import { closePanel } from "../../../redux/panelReducer";
import { EditPost } from "./children/EditPost/EditPost";
import { EditProfile } from "./children/EditProfile/EditProfile";
import { useEffect, useState } from "react";
import { DeletePost } from "./children/DeletePost/EditProfile/DeletePost";

export const EmptyPanel = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.panel);
  const [child, setChild] = useState();
  useEffect(() => {
    switch (type) {
      case "profile":
        setChild(<EditProfile />);
        break;

      case "editPost":
        setChild(<EditPost />);
        break;

      case "deletePost":
        setChild(<DeletePost />);
        break;

      default:
        break;
    }
  }, [type]);

  return (
    <div className="EmptyPanelWrapper">
      <div className="EmptyPanel flex">
        <button
          className="emptyPanelCloseBtn closeBtn"
          onClick={() => dispatch(closePanel())}
        ></button>
        {child}
      </div>
    </div>
  );
};
