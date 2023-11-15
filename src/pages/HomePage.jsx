import React, { useState, useEffect, useRef } from "react";
import myApi from "../service/service";
import List from "../layouts/List";
import Filters from "../components/Filters";
import { useAuth } from "./../context/AuthContext";
import { useAuthForm } from "../context/AuthFormContext";
import Carousel, { CarouselItem } from "../components/Carousel";
import { Link } from "react-router-dom";

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

      <Carousel indicators={false}>
        {allOffers.map((offer) => (
          <Link to={`/offers/${offer._id}`}>
            <CarouselItem
              src={offer.photo[0]}
              width={"100%"}
              info={true}
              // {...offer}
              brand={offer.brand}
              model={offer.model}
              price={offer.price}
            />
          </Link>
        ))}
      </Carousel>

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
