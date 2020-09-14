import React from "react";
import "../../App.css";
import { withRouter, NavLink } from "react-router-dom";

function Thankyou(props) {
  return (
    <div className="Appcomponent">
      Thank you !&nbsp;
      <NavLink exact to="/">
        {" "}
        Home!{" "}
      </NavLink>
    </div>
  );
}

export default withRouter(Thankyou);
