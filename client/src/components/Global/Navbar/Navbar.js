// CSS
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userReducer";
import { Mode } from "./Mode";

import { Link } from "react-router-dom";
import HomePage from "../../../pages/HomePage/HomePage";
import { qsev } from "../../../functions/functions";
import { SearchSuggestions } from "./SearchSuggestions/SearchSuggestions";
import { handleSearchChange } from "./handleSearchChange";
import { HomeIcon } from "../../../svgs/HomeIcon";
import { SettingsIcon } from "../../../svgs/SettingsIcon";
import { setPanel } from "../../../redux/panelReducer";
import { Logo } from "./Logo/Logo";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="Navbar flex row">
      <Link to="/" element={<HomePage />}>
        {/* <strong style={{ color: "var(--font-clr);" }}>OUR-APP</strong> */}
        <Logo />
      </Link>
      <input
        className="searchBar"
        type="text"
        placeholder="SEARCH..."
        onChange={() => handleSearchChange(qsev(".searchBar"))}
      />
      <SearchSuggestions />
      <Link to="/" element={<HomePage />}>
        <HomeIcon />
      </Link>
      <div className="settings" onClick={() => dispatch(setPanel("profile"))}>
        <SettingsIcon />
      </div>
      <Mode />
      <button className="btn logout" onClick={() => dispatch(logout())}>
        <strong>Logout</strong>
      </button>
    </nav>
  );
};

export default Navbar;
