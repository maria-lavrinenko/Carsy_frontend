import React, { useState, useEffect } from "react";
import myApi from "../service/service";
import { useNavigate, useParams } from "react-router-dom";
import "./Filters.css";

function Filters() {
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [energyFilter, setEnergyFilter] = useState("");
  const [cityFilter, setLocationFilter] = useState("");
  const [allData, setAllData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showRange, setShowRange] = useState(false);
  const queryParams = new URLSearchParams();
  const navigate = useNavigate();

  const fetchAllData = async () => {
    try {
      const response = await myApi.get("/offers");
      console.log(response.data);
      setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (!allData || allData.length === 0) {
    return <p>Loading...</p>;
  }
  const allBrands = [...new Set(allData.map((offer) => offer.brand))];
  const allModels = [...new Set(allData.map((offer) => offer.model))];
  const allEnergy = [...new Set(allData.map((offer) => offer.energy))];
  const allCities = [
    ...new Set(allData.map((offer) => offer.result[0].address.city)),
  ];
  const maxPrice = Math.max(...allData.map((offer) => offer.price));
  const priceFilterMarkers = Array(Math.ceil(maxPrice / 10000) + 1).fill(0);
  console.log(maxPrice);
  console.log(priceFilterMarkers);

  if (brandFilter) {
    queryParams.append("brand", brandFilter);
  }
  if (modelFilter) {
    queryParams.append("model", modelFilter);
  }
  if (energyFilter) {
    queryParams.append("energy", energyFilter);
  }
  if (cityFilter) {
    queryParams.append("city", cityFilter);
  }
  if (priceFilter) {
    console.log("pricefilter", priceFilter);
    queryParams.append("price", priceFilter);
  }

  const handleClick = () => {
    navigate(`/offers?${queryParams}`);
  };

  return (
    <>
      <div id="filters">
        <div id="filters-first-block">
          <div id="filters-first_col">
            <input
              type="text"
              placeholder="BRAND"
              list="all-brands"
              value={selectedFilter.brand}
              onChange={(e) => {
                setBrandFilter(e.target.value);
              }}
            />
            <datalist id="all-brands">
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </datalist>

            <input
              type="text"
              placeholder="CITY"
              list="all-cities"
              value={selectedFilter.city}
              onChange={(e) => {
                setLocationFilter(e.target.value);
              }}
            />
            <datalist id="all-cities">
              {allCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </datalist>
          </div>

          <div id="filters-second_col">
            <input
              type="text"
              placeholder="MODEL"
              list="all-models"
              value={selectedFilter.model}
              onChange={(e) => {
                setModelFilter(e.target.value);
              }}
            />
            <datalist id="all-models">
              {allModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </datalist>

            <input
              type="text"
              placeholder="ENERGY"
              list="all-energy"
              value={selectedFilter.energy}
              onChange={(e) => {
                setEnergyFilter(e.target.value);
              }}
            />
            <datalist id="all-energy">
              {allEnergy.map((energy) => (
                <option key={energy} value={energy}>
                  {energy}
                </option>
              ))}
            </datalist>
          </div>
        </div>
        <div id="price-filter">
          <input
            type="text"
            placeholder="MAX PRICE"
            onClick={() => setShowRange(!showRange)}
          />
          {showRange && (
            <div>
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="5000"
                value={selectedFilter.price}
                onChange={(e) => {
                  setPriceFilter(e.target.value);
                }}
              />
              <output>{priceFilter}€</output>
              <datalist id="markers">
                {priceFilterMarkers.map((marker, index) => (
                  <option key={index} value={index * 10000}>
                    {index * 10000}€
                  </option>
                ))}
              </datalist>
            </div>
          )}
        </div>

        <button id="search-button" onClick={handleClick}>
          Search
        </button>
      </div>
    </>
  );
}

export default Filters;
