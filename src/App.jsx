import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<HomePage />}>
              Home Page
            </Route>
            <Route path="/offers">All offers</Route>
            <Route path="*" element={<ErrorPage />}></Route>

            {/* available only for loggedIn users */}
            <Route path="/offers/:id">One offer</Route>

            {/* available only for clients */}
            <Route path="/fav">All favorite offers</Route>

            {/* available only for car dealers */}
            <Route path="/my-offers">My current offers</Route>
            <Route path="/my-offers/create-new">Create a new offer</Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
