import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

function Navbar() {
  const [toggle, setToggle] = useState(false);

  {
    /* Navbar : 
          LogIn/Signup modal
          
          logout button if the user is logged in
          if cardealer logged in : create a new offer, view all offers

          if a client logged in : view all fav
          
          */
  }
  return (
    <>
      <div className="Navbar">
        <h1>This is a Navbar</h1>
      </div>
      <button onClick={() => setToggle(!toggle)}>toggle Auth</button>

      {toggle && <AuthDialog />}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
