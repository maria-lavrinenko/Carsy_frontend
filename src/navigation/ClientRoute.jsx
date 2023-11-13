import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ClientRoute() {
  const { isClient, isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (!isClient) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ClientRoute;
