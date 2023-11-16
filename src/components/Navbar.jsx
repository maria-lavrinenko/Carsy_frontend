import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { Outlet, Link } from "react-router-dom";
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
        <nav id="logo-slogan">
          <ul>
            <Link to="/">
              <img
                id="navbar-logo"
                src="./../public/carsy-logo-without-words _cutted.png"
              />
            </Link>
          </ul>
          <div id="slogan">YOUR (RE)NEW CAR</div>
        </nav>

        <nav>
          <ul>
            <Link to="/about">About</Link>
          </ul>
        </nav>

        {isLoggedIn && user && user.role === "carDealer" && (
          <nav>
            <ul>
              <Link to="/my-offers">My Offers</Link>
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
              <Link to="/fav">My Favourites</Link>
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
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    style={{ color: "#525256" }}
                  />
                </button>

                {authToggle && <AuthDialog authToggle={authToggle} />}
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
