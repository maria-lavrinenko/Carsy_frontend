import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import myApi from "../service/service";
import { useNavigate, useParams } from "react-router-dom";
import Carousel, { CarouselItem } from "../components/Carousel";

function OneOfferPage() {
  const [oneOffer, setOneOffer] = useState();
  const [isFavorite, setIsFavourite] = useState(false);
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const fetchOneOffer = async () => {
    try {
      const response = await myApi.get(`/offers/${id}`);
      // console.log(response.data);
      setOneOffer(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfFav = async () => {
    try {
      const response = await myApi.get(`/offers/${id}/favourites`);
      const { isFavorite } = response.data;
      setIsFavourite(isFavorite);
      // console.log(isFavorite);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOneOffer();
    checkIfFav();
  }, []);

  if (!oneOffer) {
    return <p>Loading...</p>;
  }

  const isMyOffer =
    isLoggedIn &&
    oneOffer &&
    oneOffer.carDealer &&
    oneOffer.carDealer._id === user._id;

  const handleDelete = async () => {
    try {
      const response = await myApi.delete(`/offers/${id}`);
      navigate("/my-offers");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await myApi.delete(`/offers/${id}/favourites`);
      setIsFavourite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const reponse = await myApi.post(`/offers/${id}/favourites`);
      setIsFavourite(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(oneOffer);

  return (
    <>
      <div id="oneOffer-card" key={id}>
        <Carousel indicators={true}>
          {oneOffer.photo.map((photo) => (
            <CarouselItem src={photo} width={"100%"} />
          ))}
        </Carousel>
        <h3>{oneOffer.brand}</h3>
        <h3>{oneOffer.model}</h3>
        <h4>{oneOffer.price}</h4>
        <h4>{oneOffer.energy}</h4>
        <p>
          Published on :{" "}
          {new Date(oneOffer.updatedAt).toLocaleDateString(undefined)}
        </p>
        <p>Sold by: {oneOffer.carDealer.username}</p>
        {oneOffer.carDealer.phone ? (
          <p>Phone: {oneOffer.carDealer.phone}</p>
        ) : (
          ""
        )}
        {/* ADD GEOLOCALISATION AND RDV */}
        <div id="action-buttons">
          <div>
            {isMyOffer && (
              <div>
                <button onClick={handleDelete}>Delete</button>
                <button>Update</button>
              </div>
            )}

            {user.role === "client" && (
              <div>
                {isFavorite ? (
                  <button onClick={handleUnlike}>Unlike</button>
                ) : (
                  <button onClick={handleLike}>Like</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OneOfferPage;
