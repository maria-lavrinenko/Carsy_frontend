import React from "react";
import { useAuth } from "./../context/AuthContext";

function Logout() {
  const { authenticateUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Logout;
