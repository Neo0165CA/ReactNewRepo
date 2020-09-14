import React from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./Search-bar/index";

function Header(props) {
  let Auth = "Login";
  return (
    <div>
      <span>{Auth}</span>
      <SearchBar className="showTab authSearchBar" />
    </div>
  );
}

export default withRouter(Header);
