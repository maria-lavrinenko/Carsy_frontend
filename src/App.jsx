import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./components/LogIn";
import SignupPage from "./components/SignUp";
import NewOfferForm from "./components/NewOfferForm";
import OneOfferPage from "./pages/OneOfferPage";
import CarDealerOffersPage from "./pages/CarDealerOffersPage";
import AllOffersPage from "./pages/AllOffersPage";
function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="/offers" element={<AllOffersPage />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>

            {/* available only for loggedIn users */}
            <Route path="/offers/:id" element={<OneOfferPage />}></Route>

            {/* available only for clients */}
            <Route path="/fav" element={<FavouritesPage />}></Route>

            {/* available only for car dealers */}
            <Route path="/my-offers" element={<CarDealerOffersPage />}></Route>
            <Route path="/my-offers/create-new" element={<NewOfferForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
