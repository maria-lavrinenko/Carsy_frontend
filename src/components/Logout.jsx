import React from "react";
import { useAuth } from "./../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function Logout() {
  const { authenticateUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };
  return (
    <>
      <button onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          style={{ color: "#525256" }}
          size={{ width: "125px" }}
        />
      </button>
    </>
  );
}

export default Logout;
