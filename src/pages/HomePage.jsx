import React, { useState, useEffect, useRef } from "react";
import myApi from "../service/service";
import List from "../layouts/List";
import Filters from "../components/Filters";

function HomePage() {
  const [allOffers, setAllOffers] = useState(null);
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

  return (
    <>
      <Filters />
      <List offersToFetch={allOffers} />
    </>
  );
}

export default HomePage;
