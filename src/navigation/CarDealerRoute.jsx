import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function CarDealerRoute() {
  const { isCarDealer, isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (!isCarDealer) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default CarDealerRoute;
