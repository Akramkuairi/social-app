import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchSuggestions.css";

export const SearchSuggestions = () => {
  const { search, currenPage } = useSelector((state) => state);
  const [menu, setMenu] = useState();

  useEffect(() => {
    if (search.users.length === 0) {
      setMenu(<div className="menu">No User Found</div>);
    } else {
      setMenu(
        <div className="menu">
          {search.users.map((user) => {
            return (
              <Link to={`/profile/${user._id}`}>
                <div className="user" key={user._id}>
                  @{user.username}
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  }, [search, currenPage]);

  return search.isSearch === true ? (
    <div className="SearchSuggestions flex">{menu}</div>
  ) : (
    <></>
  );
};
