import React, { useState, useEffect } from "react";
import { useAuth } from "./../context/AuthContext.jsx";
import List from "../layouts/List";
import myApi from "../service/service";

function CarDealerOffersPage() {
  const { authenticateUser } = useAuth();

  const [myOffers, setMyOffers] = useState(null);
  const { user } = useAuth();
  authenticateUser();
  console.log(user);
  const carDealer = user._id;
  const fetchMyOffers = async () => {
    try {
      const response = await myApi.get("/offers", {
        params: { carDealer },
      });
      console.log(response.data);
      setMyOffers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOffers();
  }, [authenticateUser]);

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
