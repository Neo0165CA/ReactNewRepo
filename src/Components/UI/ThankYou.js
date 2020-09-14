import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import "../../App.css";

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
