import { createContext, useContext, useState, useEffect } from "react";
import myApi from "./../service/service";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function authenticateUser() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      console.log("No logged user");
      return;
    }
    try {
      const user = await myApi.getUserInfos();
      console.log(user);
      setUser(user);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, authenticateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
