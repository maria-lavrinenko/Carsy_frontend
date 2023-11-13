import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import myApi from "../service/service";
import { useNavigate, useParams } from "react-router-dom";
import Carousel, { CarouselItem } from "../components/Carousel";

function OneOfferPage() {
  const [oneOffer, setOneOffer] = useState();
  const [isFavorite, setIsFavourite] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [energy, setEnergy] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const photoInput = useRef();
  const ref = useRef();
  const [map, setMap] = useState();

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
  }, [toUpdate]);

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

  const handleBrand = (e) => {
    if (e.target.value !== "") {
      return setBrand(e.target.value);
    }
  };
  const handleModel = (e) => {
    if (e.target.value !== "") {
      return setModel(e.target.value);
    }
  };
  const handleEnergy = (e) => {
    if (e.target.value !== "") {
      return setEnergy(e.target.value);
    }
  };
  const handlePrice = (e) => {
    if (e.target.value !== "") {
      return setPrice(e.target.value);
    }
  };
  const handleYear = (e) => {
    if (e.target.value !== "") {
      return setYear(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("brand", brand);
    fd.append("model", model);
    fd.append("price", price);
    fd.append("year", year);
    fd.append("energy", energy);

    const photoFileInput = photoInput.current.files;
    if (photoFileInput.length > 10) {
      setError("Sorry, only 10 photos allowed");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    for (let i = 0; i < photoFileInput.length; i++) {
      fd.append("photo", photoInput.current.files[i]);
    }
    try {
      const response = await myApi.put(`/offers/${id}`, fd);

      console.log(response);
      setToUpdate(true);
      // navigate(`/projects/${params.projectId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

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
                <button
                  onClick={() => {
                    setToUpdate(true);
                  }}
                >
                  Update
                </button>
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
      {toUpdate && (
        <div id="update-offer">
          <div>
            <h1>Update The Offer</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="brand">Brand: </label>
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={handleBrand}
                />
              </div>
              <div>
                <label htmlFor="model">Model: </label>
                <input
                  type="text"
                  id="model"
                  value={model}
                  onChange={handleModel}
                />
              </div>
              <div>
                <label htmlFor="price">Price: </label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={handlePrice}
                />
              </div>
              <div>
                <label htmlFor="energy">Energy: </label>
                <input
                  type="text"
                  id="energy"
                  value={energy}
                  onChange={handleEnergy}
                />
              </div>
              <div>
                <label htmlFor="year">Year: </label>
                <input
                  type="text"
                  id="year"
                  maxLength="4"
                  pattern="\d{4}"
                  value={year}
                  onChange={handleYear}
                />
              </div>
              <div>
                <label htmlFor="photo">Photo </label>
                <input
                  ref={photoInput}
                  accept="image/png, image/jpeg"
                  type="file"
                  multiple
                  name=""
                  id="photo"
                />
              </div>
              <button>Submit Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default OneOfferPage;
