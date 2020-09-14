import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import "../../../App.css";

function Signupsuccess() {
  return (
    <div className="Appcomponent">
      Thank you, Sign up successfully !!&nbsp;
      <NavLink exact to="/login">
        {" "}
        Sign in to your account!{" "}
      </NavLink>
    </div>
  );
}

export default withRouter(Signupsuccess);
