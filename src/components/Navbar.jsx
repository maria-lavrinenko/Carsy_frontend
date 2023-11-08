import React from "react";
import { Outlet } from "react-router-dom";

function Navbar() {
  {
    /* Navbar layout 
          LogIn modal
          SingUp modal
          logout button if the user is logged in
          
          */
  }
  return (
    <>
      <h1>logo</h1>

      <Outlet />
    </>
  );
}

export default Navbar;
