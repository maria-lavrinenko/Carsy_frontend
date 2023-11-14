import React, { useState, useEffect, useRef } from "react";
import myApi from "../service/service";
import List from "../layouts/List";
import Filters from "../components/Filters";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [allOffers, setAllOffers] = useState(null);
  const navigate = useNavigate()
  const fetchAllOffers = async () => {
    try {
      const response = await myApi.get("/offers");
      console.log(response.data);
      setAllOffers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientSignUp = () {

  }

  useEffect(() => {
    fetchAllOffers();
  }, []);

  if (!allOffers) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Filters />
      <List offersToFetch={allOffers} />
      <div id="auth">
        <div onClick={handleClientSignUp}>I'm a client, I want to buy</div>
        <div onClick={handleCarDealerSignUp}>
          I'a a car dealer, I want to sell
        </div>
      </div>
    </>
  );
}

export default HomePage;
