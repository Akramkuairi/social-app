import { useSelector } from "react-redux";
import "./SubNotification.css";

export const SubNotification = () => {
  const { subNotification } = useSelector((state) => state);
  let wrapperStyle, barStyle;

  if (subNotification.status === "success") {
    wrapperStyle = {
      backgroundColor: "rgba(82, 232, 48, 0.61)",
      border: "1px solid rgb(3, 194, 23)",
    };
    barStyle = {
      background: "linear-gradient(90deg, #0f0 50%, #fff 50%)",
    };
  } else {
    wrapperStyle = {
      backgroundColor: "#f004",
      border: "1px solid #f00",
    };
    barStyle = {
      background: "linear-gradient(90deg, #f00 50%, #fff 50%)",
    };
  }

  const result = subNotification.isNotification ? (
    <div className="SubNotificationBg">
      <div className="SubNotification flex" style={wrapperStyle}>
        <div className="bar" style={barStyle}></div>
        <div className="msg">{subNotification.msg}</div>
      </div>
    </div>
  ) : (
    ""
  );
  return result;
};
