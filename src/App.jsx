import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import FavouritesPage from "./pages/FavouritesPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./components/LogIn";
import SignupPage from "./components/SignUp";
import NewOfferForm from "./components/NewOfferForm";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="/offers">All offers</Route>
            <Route path="*" element={<ErrorPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>

            {/* available only for loggedIn users */}
            <Route path="/offers/:id">One offer</Route>

            {/* available only for clients */}
            <Route path="/fav" element={<FavouritesPage />}></Route>

            {/* available only for car dealers */}
            <Route path="/my-offers">My current offers</Route>
            <Route path="/my-offers/create-new" element={<NewOfferForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
