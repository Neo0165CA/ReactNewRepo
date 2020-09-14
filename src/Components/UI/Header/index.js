import React from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./Search-bar/index";

function Header(props) {
  return <SearchBar className="showTab authSearchBar" />;
}

export default withRouter(Header);
