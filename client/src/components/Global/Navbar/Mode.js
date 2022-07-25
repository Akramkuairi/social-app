// CSS
import "./Navbar.css";

// icons

// Redux
import { useSelector } from "react-redux";

import { store } from "../../../redux/store";
import { axiosConfiguration } from "../../../functions/axiosConfig";
import { updateMode } from "../../../redux/userReducer";
import { qs } from "../../../functions/functions";
import { setCookie } from "../../../functions/Cookies";
import { SunIcon } from "../../../svgs/SunIcon";
import { MoonIcon } from "../../../svgs/MoonIcon";

export const Mode = () => {
  const mode = useSelector((state) =>
    state.user.mode === "light" ? "dark" : "light"
  );

  return (
    <button
      className={`mode ${mode}`}
      onClick={() => ChangeMode({ mode: mode })}
    >
      {mode === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

const ChangeMode = (data) => {
  const axiosConfig = axiosConfiguration();
  axiosConfig
    .put("/user/update/mode", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      store.dispatch(updateMode(data.mode));
      switchMode(data.mode);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const switchMode = (mode) => {
  setCookie(["mode", mode]);

  const root = qs(":root");
  if (mode === "light") {
    root.style.setProperty("--bg-clr", "#eee");
    root.style.setProperty("--font-clr", "#222");
    root.style.setProperty("--main-comp-clr", "#fff6");
    // document.querySelector(".App .bg").style.backgroundImage =
    // "url(./imgs/light-mode.jpg)";
  } else {
    root.style.setProperty("--bg-clr", "#242424");
    root.style.setProperty("--font-clr", "#fff");
    root.style.setProperty("--main-comp-clr", "rgba(60, 60, 60, 0.7)");
    // qs(".bg").style = "backgroundImage:url(./imgs/dark-mode.jpg)";
  }
};
