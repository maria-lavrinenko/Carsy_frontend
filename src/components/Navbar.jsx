import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      <div className="Navbar">
        <h1>This is a Navbar</h1>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
