import React from "react";
import { withRouter } from "react-router-dom";
import SearchBar from "./Search-bar/index";

function Header(props) {

  const userId = localStorage.getItem("userId");
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    props.history.push("/");

  }
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if(expirationDate <= new Date()) logout(); 

  const styles = {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor : "pointer"
}

  return (
    <div>
      <span style={styles} onClick={logout}>Welcome User {userId} | <u>Logout</u></span>
      <SearchBar className="showTab authSearchBar" />
    </div>
  );
}

export default withRouter(Header);
