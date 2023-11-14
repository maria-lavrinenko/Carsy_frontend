import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";

function AllOffersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allOffers, setAllOffers] = useState(null);
  const [sortby, setSortby] = useState("");
  const selectedBrand = searchParams.get("brand");
  const selectedModel = searchParams.get("model");
  const selectedEnergy = searchParams.get("energy");
  const selectedCity = searchParams.get("city");
  const selectedPrice = searchParams.get("price");
  const queryParams = new URLSearchParams();

  if (selectedBrand) {
    queryParams.append("brand", selectedBrand);
  }
  if (selectedModel) {
    queryParams.append("model", selectedModel);
  }
  if (selectedEnergy) {
    queryParams.append("energy", selectedEnergy);
  }
  if (selectedCity) {
    queryParams.append("city", selectedCity);
  }
  if (selectedPrice) {
    queryParams.append("price", selectedPrice);
  }

  const fetchAllOffers = async () => {
    try {
      const response = await myApi.get(`/offers?${queryParams}`);
      console.log(response.data);
      setAllOffers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOffers();
  }, [
    selectedBrand,
    selectedModel,
    selectedEnergy,
    selectedCity,
    selectedPrice,
    sortby,
  ]);

  if (!allOffers) {
    return <p>Loading...</p>;
  }

  const handleSortChange = (e) => {
    const key = e.target.value;
    if (!allOffers) return;
    let sortedOffers;
    if (key === "descreasing-price") {
      sortedOffers = allOffers.toSorted((a, b) => {
        b.price - a.price;
      });
    } else if (key === "increasing-price") {
      sortedOffers = allOffers.toSorted((a, b) => {
        a.price - b.price;
      });
    }

    setAllOffers(sortedOffers);
    setSortby(key);
    // fetchAllOffers();
  };

  return (
    <>
      <Filters />
      <div className="sort-container">
        <select id="sort-select" onChange={handleSortChange} value={sortby}>
          <option value="">Sort by: </option>
          <option value="descreasing-price">Sort by: Price ()</option>
          <option value="increasing-price">Sort by: Price()</option>
        </select>
      </div>
      <List offersToFetch={allOffers} />
    </>
  );
}
export default AllOffersPage;
