import React, { useState, useEffect } from "react";
import List from "../layouts/List";
import myApi from "../service/service";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";

function AllOffersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allOffers, setAllOffers] = useState(null);
  const selectedBrand = searchParams.get("brand");
  const selectedModel = searchParams.get("model");
  const selectedEnergy = searchParams.get("energy");
  const selectedLocation = searchParams.get("location");
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
  if (selectedLocation) {
    queryParams.append("location", selectedLocation);
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
  }, [selectedBrand, selectedModel, selectedEnergy, selectedLocation]);

  if (!allOffers) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Filters />
      {/* ADD SORT BY */}
      <List offersToFetch={allOffers} />
    </>
  );
}

export default AllOffersPage;
