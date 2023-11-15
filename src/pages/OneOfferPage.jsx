import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import googleApi from "../service/googleMapsService";
import { useAuth } from "../context/AuthContext";
import myApi from "../service/service";
import { useNavigate, useParams } from "react-router-dom";
import Carousel, { CarouselItem } from "../components/Carousel";
import "./OneOfferPage.css";

function OneOfferPage() {
  const [oneOffer, setOneOffer] = useState();
  const [isFavorite, setIsFavourite] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [energy, setEnergy] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState({});
  const photoInput = useRef();
  const [infoWindowData, setInfoWindowData] = useState();

  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  const fetchOneOffer = async () => {
    try {
      const response = await myApi.get(`/offers/${id}`);
      console.log(response.data[0]);
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
    console.log("Fetching offer...");
    fetchOneOffer();
    checkIfFav();
  }, []);

  const fetchLocation = async () => {
    try {
      const locationData = await googleApi.getLocation({
        street: oneOffer.carDealer.address.street,
        zipcode: oneOffer.carDealer.address.zipcode,
        city: oneOffer.carDealer.address.city,
      });

      setLocation(locationData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!oneOffer) return;
    fetchLocation();
  }, [oneOffer]);

  const center = {
    lat: location.lat,
    lng: location.lng,
  };
  if (!oneOffer || !location) {
    return <p>Loading...</p>;
  }

  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "#bbee11",
    fillOpacity: 1,
    strokeWeight: 1.2,
    rotation: 0,
    scale: 1,
  };

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
      fetchOneOffer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="oneOffer-card" key={id}>
        <Carousel indicators={true}>
          {oneOffer.photo.map((photo) => {
            let url = photo === "carsy-logo.png" ? "/carsy-logo.png" : photo;
            return <CarouselItem src={url} width={"100%"} />;
          })}
        </Carousel>
        <h3>{oneOffer.brand}</h3>
        <h3>{oneOffer.model}</h3>
        <h4>{oneOffer.price}€</h4>
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
        <div className="container">
          <div>
            {!isLoaded || !center.lat ? (
              <p>Map is loading ... </p>
            ) : (
              <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                mapContainerStyle={{ width: "80%", height: "50vh" }}
                zoom={15}
              >
                <MarkerF
                  position={center}
                  icon={
                    //default "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    customMarker
                  }
                />
              </GoogleMap>
            )}
          </div>
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
      </div>
    </>
  );
}

export default OneOfferPage;
