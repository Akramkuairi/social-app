// CSS
import "../AuthPage.css";

// Functions
import { qsev } from "../../../functions/functions";
import { signupUser } from "./functions/signupUser";
import { Link } from "react-router-dom";

export function SignUpPage() {
  return (
    <div className="SignUpPage AuthPage flex row">
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
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" className="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="password" />
        <label htmlFor="repeat_password">Repeat_Password</label>
        <input
          type="password"
          name="repeat_password"
          className="repeat_password"
        />

        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            signupUser({
              username: qsev(".AuthPage .username"),
              password: qsev(".AuthPage .password"),
              repeat_password: qsev(".AuthPage .repeat_password"),
            });
          }}
        >
          Sign up
        </button>
        <span>Have an account? {<Link to="/login">Login</Link>}</span>
      </form>
    </div>
  );
}
