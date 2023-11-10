import React, { useState, useEffect, useRef } from "react";
import myApi from "../service/service";
import ListLayout from "../layouts/ListLayout";

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
      <ListLayout offersToFetch={allOffers} />
      {/* <div id="all-filters">
        {allOffers.map((offer) => {
          return (
            <div>
              <h1>{offer.brand}</h1>
              <button key={offer._id} value={offer.brand}>
                {offer.brand}
              </button>
              ;
            </div>
          );
        })}
      </div> */}
    </>
  );
}

export default HomePage;
