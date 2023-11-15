import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";

function AllOffersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allOffers, setAllOffers] = useState([]);
  const [sortBy, setSortBy] = useState("");
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
  ]);

  if (!allOffers) {
    return <p>Loading...</p>;
  }

  const handleSortChange = (e) => {
    if (!allOffers) return;
    const key = e.target.value;
    let sortedOffers;
    if (key === "descending-price") {
      sortedOffers = allOffers.toSorted((a, b) => {
        return b.price - a.price;
      });
    } else if (key === "ascending-price") {
      sortedOffers = allOffers.toSorted((a, b) => {
        return a.price - b.price;
      });
    } else if (key === "") return;

    setAllOffers(sortedOffers);
    setSortBy(key);
  };

  return (
    <>
      <Filters />
      <div className="sort-container">
        <select id="sort-select" onChange={handleSortChange} value={sortBy}>
          <option value="">Sort by: </option>

          <option value="descending-price">Price: High to Low</option>
          <option value="ascending-price">Price: Low to High</option>
        </select>
      </div>

      <List offersToFetch={allOffers} />
    </>
  );
}
export default AllOffersPage;
