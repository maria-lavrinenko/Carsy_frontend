import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "./NewOfferForm.css";
import myApi from "./../service/service";

function NewOfferForm({ setNewFormToggle, newFormToggle }) {
  const navigate = useNavigate();

  const { isSubmitted, setIsSubmitted } = useForm();
  const brandInput = useRef();
  const modelInput = useRef();
  const priceInput = useRef();
  const yearInput = useRef();
  const energyInput = useRef();
  const photoInput = useRef();

  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const brand = brandInput.current.value.toUpperCase();
    const model =
      modelInput.current.value.charAt(0).toUpperCase() +
      modelInput.current.value.slice(1).toLowerCase();
    const price = priceInput.current.value;
    const year = yearInput.current.value;
    const energy =
      energyInput.current.value.charAt(0).toUpperCase() +
      energyInput.current.value.slice(1).toLowerCase();
    const photoFileInput = photoInput.current.files;

    const fd = new FormData();
    fd.append("brand", brand);
    fd.append("model", model);
    fd.append("price", price);
    fd.append("year", year);
    fd.append("energy", energy);

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
      const response = await myApi.post("/offers", fd);
      console.log("success", response);
      setIsSubmitted(true);
      setNewFormToggle((current) => !current);
      navigate("/my-offers");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <>
      <div className="centered">
        <div className="modal">
          {newFormToggle && (
            <div className="modalContent">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="brand">Brand: </label>
                  <input type="text" ref={brandInput} id="brand" required />
                </div>
                <div>
                  <label htmlFor="model">Model: </label>
                  <input type="text" ref={modelInput} id="model" required />
                </div>
                <div>
                  <label htmlFor="price">Price: </label>
                  <input type="number" ref={priceInput} id="price" required />
                </div>
                <div>
                  <label htmlFor="year">Year: </label>
                  <input
                    type="text"
                    maxLength="4"
                    pattern="\d{4}"
                    ref={yearInput}
                    id="year"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="energy">Energy: </label>
                  <input
                    pattern="[A-Za-z]{2,}"
                    type="text"
                    ref={energyInput}
                    id="energy"
                    required
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
                <button>Submit</button>
                <button
                  onClick={() => {
                    setNewFormToggle((current) => !current);
                  }}
                >
                  Not now
                </button>
                <p className="error">{error}</p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NewOfferForm;
