import React from "react";
import { Link } from "react-router-dom";

function Nav(){
  return(
    <nav>
      <Link to="/">MainPage</Link>
      <Link to="/admin">Admin Page</Link>
    </nav>
  );
}

export default Nav;