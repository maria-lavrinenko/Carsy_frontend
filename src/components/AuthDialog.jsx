import React, { useState } from "react";
import Login from "./LogIn";
import Signup from "./SignUp";
import "./AuthDialog.css";

function AuthDialog({ authToggle, setAuthToggle }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipModal = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className="centered">
        <div className="modal">
          <div className={`flip-modal ${isFlipped ? "flipped" : ""}`}>
            <div className="flip-modal-inner">
              <div className="flip-modal-front">
                <div className="modal-inside-content">
                  <Login />
                  <div className="auth-question">
                    Don't have the account yet ?
                    <button onClick={flipModal}>Sign up! </button>
                  </div>
                </div>
              </div>

              <div className="flip-modal-back">
                <div className="modal-inside-content">
                  <Signup isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                  <div className="auth-question">
                    Already have an account ?
                    <button onClick={flipModal}>Log In !</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthDialog;
