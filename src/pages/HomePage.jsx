import React, { useState, useEffect, useRef } from "react";
import myApi from "../service/service";
import List from "../layouts/List";
import Filters from "../components/Filters";
import { useAuth } from "./../context/AuthContext";
import { useAuthForm } from "../context/AuthFormContext";
import Carousel, { CarouselItem } from "../components/Carousel";

function HomePage() {
  const [allOffers, setAllOffers] = useState(null);
  const { isLoggedIn } = useAuth();
  const { authToggle, setAuthToggle, userType, setUserType } = useAuthForm();
  const fetchAllOffers = async () => {
    try {
      const response = await myApi.get("/offers");
      console.log(response.data);
      setAllOffers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOffers();
  }, []);

  if (!allOffers) {
    return <p>Loading...</p>;
  }
  const handleClientSignUp = () => {
    setUserType("client");
    setAuthToggle(!authToggle);
  };
  const handleCarDealerSignUp = () => {
    setUserType("carDealer");
    setAuthToggle(!authToggle);
  };
  return (
    <>
      <Filters />
      <List offersToFetch={allOffers}></List>

      {/* <Carousel indicators={false}>
        {allOffers.map((offer) => (
          <CarouselItem src={offer} width={"100%"} />
        ))}
      </Carousel> */}
      <div id="auth">
        {!isLoggedIn && (
          <div id="auth">
            <button onClick={handleClientSignUp}>
              I'm a client, I want to buy
            </button>
            <button onClick={handleCarDealerSignUp}>
              I'm a car dealer, I want to sell
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
