import { switchMode } from "../components/Global/Navbar/Mode";

export const setCookie = (...args) => {
  for (let arg in args) {
    localStorage.setItem(args[arg][0], args[arg][1]);
  }
};

export const deleteCookies = () => {
  switchMode("dark");
  const items = ["username", "token", "name", "mode"];
  for (let item in items) {
    localStorage.removeItem(items[item]);
  }
};
