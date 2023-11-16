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
  const [isCarDealer, setIsCarDealer] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

      setUser(user);
      setIsLoggedIn(true);
      setIsLoading(false);
      if (user.role === "client") {
        setIsClient(true);
      }
      if (user.role === "carDealer") {
        setIsCarDealer(true);
      }
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
      value={{
        user,
        isLoggedIn,
        isLoading,
        isCarDealer,
        isClient,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
