import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthDialog from "./AuthDialog";
import NewOfferForm from "./NewOfferForm";
import Logout from "./Logout";

function Navbar() {
  const [authToggle, setAuthToggle] = useState(false);
  const [newFormToggle, setNewFormToggle] = useState(false);
  const { isLoggedIn, user } = useAuth();

  console.log(user);
  return (
    <>
      <div className="Navbar">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>

        <nav>
          <ul>
            {isLoggedIn ? (
              <Logout />
            ) : (
              <>
                <li>
                  <button onClick={() => setAuthToggle(!authToggle)}>
                    toggle Auth
                  </button>

                  {authToggle && <AuthDialog />}
                </li>
              </>
            )}
          </ul>
        </nav>
        <nav>
          <ul>
            {isLoggedIn && user && user.role === "carDealer" && (
              <div>
                <li>
                  <div onClick={() => setNewFormToggle(!newFormToggle)}>
                    New Offer
                  </div>
                  {newFormToggle && (
                    <NewOfferForm
                      setNewFormToggle={setNewFormToggle}
                      newFormToggle={newFormToggle}
                    />
                  )}
                </li>

                <li>
                  <NavLink to="/my-offers">My Offers</NavLink>
                </li>
              </div>
            )}
          </ul>
        </nav>
        <nav>
          <ul>
            {isLoggedIn && user && user.role === "client" && (
              <NavLink to="/fav">My Favourites</NavLink>
            )}
          </ul>
        </nav>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navbar;
