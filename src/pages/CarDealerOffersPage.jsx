import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";
import NewOfferForm from "../components/NewOfferForm";

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
  if (myOffers.length === 0) {
    return (
      <div>
        It seems like you haven't published any offer yet...you can do it here{" "}
        <NewOfferForm />
      </div>
    );
  }
  return (
    <>
      <List offersToFetch={myOffers}></List>
    </>
  );
}

export default CarDealerOffersPage;
