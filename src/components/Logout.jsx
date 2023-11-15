import React from "react";
import { useAuth } from "./../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Logout() {
  const { authenticateUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };
  return (
    <>
      <div onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          style={{
            "--fa-primary-color": "#bbee11",
            "--fa-secondary-color": "#000001",
          }}
        />
      </div>
    </>
  );
}

export default Logout;
