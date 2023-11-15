import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthDialog from "./AuthDialog";
import NewOfferForm from "./NewOfferForm";
import Logout from "./Logout";
import { useAuthForm } from "../context/AuthFormContext";
import "./Navbar.css";

function Navbar() {
  const { authToggle, setAuthToggle } = useAuthForm();
  const [newFormToggle, setNewFormToggle] = useState(false);
  const { isLoggedIn, user } = useAuth();

  console.log(user);
  return (
    <>
      <div className="Navbar">
        <nav>
          <ul>
            <NavLink to="/">Home</NavLink>
          </ul>
        </nav>
        <nav>
          <ul>
            <NavLink to="/about">About</NavLink>
          </ul>
        </nav>

        {isLoggedIn && user && user.role === "carDealer" && (
          <nav>
            <ul>
              <NavLink to="/my-offers">My Offers</NavLink>
            </ul>
          </nav>
        )}
        {isLoggedIn && user && user.role === "carDealer" && (
          <nav>
            <ul>
              <div onClick={() => setNewFormToggle(!newFormToggle)}>
                New Offer
              </div>
              {newFormToggle && (
                <NewOfferForm
                  setNewFormToggle={setNewFormToggle}
                  newFormToggle={newFormToggle}
                />
              )}
            </ul>
          </nav>
        )}

        <nav>
          <ul>
            {isLoggedIn && user && user.role === "client" && (
              <NavLink to="/fav">My Favourites</NavLink>
            )}
          </ul>
        </nav>

        <nav>
          {isLoggedIn ? (
            <ul>
              <Logout />
            </ul>
          ) : (
            <>
              <ul>
                <button onClick={() => setAuthToggle(!authToggle)}>
                  toggle Auth
                </button>

                {authToggle && <AuthDialog />}
              </ul>
            </>
          )}
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
