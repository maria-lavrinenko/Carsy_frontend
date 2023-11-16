import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";

import { useForm } from "./../context/FormContext";

function CarDealerOffersPage() {
  const [myOffers, setMyOffers] = useState(null);
  const { isSubmitted, setIsSubmitted } = useForm();

  const fetchMyOffers = async () => {
    try {
      const response = await myApi.get("/my-offers");

      setMyOffers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOffers();
  }, [isSubmitted]);

  if (!myOffers) {
    return <p>Loading...</p>;
  }
  if (myOffers.length === 0) {
    return <div>It seems like you haven't published any offer yet...</div>;
  }
  return (
    <>
      <div className="all-offers-page">
        <div id="list-carousel">
          <List offersToFetch={myOffers}></List>
        </div>
      </div>
    </>
  );
}

export default CarDealerOffersPage;
