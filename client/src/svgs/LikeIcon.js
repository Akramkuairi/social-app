import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const LikeIcon = (props) => {
  const { user } = useSelector((state) => state);
  const [stroke, setStroke] = useState();

  useEffect(() => {
    if (user.mode === "light" && props.fill === "#0000") {
      setStroke("#000");
    } else if (user.mode === "light" && props.fill === "#fff") {
      setStroke("#777");
    } else if (user.mode === "dark" && props.fill === "#0000") {
      setStroke("#fff");
    } else {
      setStroke("#777");
    }
    return;
  }, [props.fill, user]);
  return (
    <svg
      width="37"
      height="29"
      viewBox="0 0 37 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={stroke}
        strokeWidth="2"
        fill={props.fill}
        d="M33.5 9.26133C37.0021 10.3007 34.5729 24.2913 31 26.1909C27.4271 28.0905 12.2373 26.9383 12.5 25.8175L12.3663 9.49105C12.3663 9.49105 17 2 17.5 1.5C18 1 20.5 0.500019 21 2.50001C21.5 4.49999 21.8476 8.48212 22.1738 9.49105C22.5 10.5 29.9979 8.22196 33.5 9.26133Z"
        stroke-width="2"
      />
      <path
        stroke={stroke}
        strokeWidth="2"
        fill={props.fill}
        d="M1.5 26.8175C1.5066 25.8701 1.5 9.49998 1.5 9.49998C1.5 9.10318 9 9.85734 9 9.85734L9.00002 26C8.99378 26.521 1.49341 27.7648 1.5 26.8175Z"
        stroke-width="2"
      />
    </svg>
  );
};
