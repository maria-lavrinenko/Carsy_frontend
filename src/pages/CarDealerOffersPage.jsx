import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";

function CarDealerOffersPage() {
  const [myOffers, setMyOffers] = useState(null);

  const fetchMyOffers = async () => {
    try {
      const response = await myApi.get("/my-offers", {});
      console.log(response.data);
      setMyOffers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  if (!myOffers) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <List offersToFetch={myOffers}></List>
    </>
  );
}

export default CarDealerOffersPage;
