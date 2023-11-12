import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import myApi from "../service/service";
import { useParams } from "react-router-dom";

function OneOfferPage() {
  const [oneOffer, setOneOffer] = useState();
  const [isFavorite, setIsFavourite] = useState(false);
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();

  const fetchOneOffer = async () => {
    try {
      const response = await myApi.get(`/offers/${id}`);
      console.log(response.data);
      setOneOffer(response.data[0]);
      console.log(oneOffer);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfFav = async () => {
    try {
      const response = await myApi.get(`/offers/${id}/favourites`);
      const { isFavorite } = response.data;
      setIsFavourite(isFavorite);
      console.log(isFavorite);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOneOffer();
    checkIfFav();
  }, []);

  if (!oneOffer) {
    <p>Loading...</p>;
  }
  console.log(user);
  const isMyOffer = isLoggedIn && oneOffer.carDealer._id === user._id;

  return (
    <>
      <div id="action-buttons">
        <div>
          {isMyOffer && (
            <div>
              <button>Delete</button>
              <button>Update</button>
            </div>
          )}

          {user.role === "client" && (
            <div>
              <button onClick={handleFavorite}>
                {isFavorite ? "Unlike" : "Like"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OneOfferPage;
