import React, { createContext, useContext, useState, useEffect } from "react";
import myApi from "../service/service";

const AuthFormContext = createContext();

export function useAuthForm() {
  return useContext(AuthFormContext);
}

function AuthFormContextWrapper({ children }) {
  const [authToggle, setAuthToggle] = useState(false);
  const [userType, setUserType] = useState("");

  return (
    <AuthFormContext.Provider
      value={{ authToggle, setAuthToggle, userType, setUserType }}
    >
      {children}
    </AuthFormContext.Provider>
  );
}

export default AuthFormContextWrapper;
