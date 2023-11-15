import axios from "axios";
import { useSearchParams } from "react-router-dom";

const googleApi = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/geocode/json`,
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});

googleApi.getLocation = async ({ zipcode, city, street }) => {
  return googleApi
    .get("", {
      params: {
        address: street,
        components: `post_box:${zipcode}&locality:${city}`,
      },
    })
    .then((response) => {
      //   console.log(response.data.results[0].geometry.location);
      return response.data.results[0].geometry.location;
    })
    .catch((error) => console.log(error));
};

export default googleApi;
