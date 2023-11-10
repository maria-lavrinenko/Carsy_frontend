import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";

function FavouritesPage() {
  const [favOffers, setFavOffers] = useState(null);
  const fetchFavourites = async () => {
    try {
      const response = await myApi.get("/favourites");
      console.log(response.data);
      setFavOffers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (!favOffers) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <List offersToFetch={favOffers} />
    </>
  );
}

export default FavouritesPage;
