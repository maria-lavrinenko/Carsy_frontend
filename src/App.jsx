import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import OneOfferPage from "./pages/OneOfferPage";
import CarDealerOffersPage from "./pages/CarDealerOffersPage";
import AllOffersPage from "./pages/AllOffersPage";
import LoggedInUser from "./components/LoggedInUser";
import ClientRoute from "./navigation/ClientRoute";
import CarDealerRoute from "./navigation/CarDealerRoute";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="/about">About Me</Route>
            <Route path="/offers" element={<AllOffersPage />}></Route>
            <Route element={<LoggedInUser />}>
              <Route path="/offers/:id" element={<OneOfferPage />}></Route>

              <Route element={<ClientRoute />}>
                <Route path="/fav" element={<FavouritesPage />}></Route>
              </Route>
              <Route element={<CarDealerRoute />}>
                <Route
                  path="/my-offers"
                  element={<CarDealerOffersPage />}
                ></Route>
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
