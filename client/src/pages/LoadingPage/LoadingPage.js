// // Libraries and Packages
// import { require } from "react";

// CSS
import "./LoadingPage.css";

// Redux
import { useSelector } from "react-redux";

export function LoadingPage() {
  const { loading } = useSelector((state) => state);

  return (
    <div className="LoadingPage flex">
      <div className="loadingContainer">
        <img
          src={require("./processing2.png")}
          alt="Loading"
          className="loadingImg"
        />
        <div className="msg">{loading.msg}</div>
      </div>
    </div>
  );
}
