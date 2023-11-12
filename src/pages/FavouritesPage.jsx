import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";
import { Link } from "react-router-dom";

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
  if (favOffers.length === 0) {
    return (
      <p>
        It seems like you don't have any favourites yet.. check out our latest{" "}
        <Link to="/offers">arrivals</Link>
      </p>
    );
  }
  return (
    <>
      <List offersToFetch={favOffers} />
    </>
  );
}

export default FavouritesPage;
