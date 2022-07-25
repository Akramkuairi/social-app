// CSS
import "../AuthPage.css";

// Functions
import { qsev } from "../../../functions/functions";
import { loginUser } from "./functions/loginUser";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div className="LoginPage AuthPage flex row">
      <div className="mainDesciption flex">
        <div className="title">
          <ul className="flex row">
            <li
              style={{
                animation: "write 4s 4.3s forwards",
              }}
            >
              P
            </li>
            <li
              style={{
                animation: "write 4s 3.75s forwards",
              }}
            >
              P
            </li>
            <li
              style={{
                animation: "write 4s 3.20s forwards",
              }}
            >
              A
            </li>
            <li
              style={{
                margin: "0 1rem",
                animation: "write 4s 2.65s forwards",
              }}
            >
              -
            </li>
            <li
              style={{
                animation: "write 4s 2.1s forwards",
              }}
            >
              R
            </li>
            <li
              style={{
                animation: "write 4s 1.55s forwards ",
              }}
            >
              U
            </li>
            <li
              style={{
                animation: "write 4s 1s forwards",
              }}
            >
              O
            </li>
          </ul>
        </div>
        <p>
          Focused on communication, community-based input, interaction,
          content-sharing and collaboration. audience using this app can stay in
          touch and interact with friends, family and various communities
        </p>
      </div>
      <form className="flex">
        <h4>Login</h4>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" className="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="password" />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            loginUser({
              username: qsev(".LoginPage .username"),
              password: qsev(".LoginPage .password"),
            });
          }}
        >
          Login
        </button>
        <br />
        <span>Don't have an account? {<Link to="/signup">Sign up</Link>}</span>
      </form>
    </div>
  );
}
