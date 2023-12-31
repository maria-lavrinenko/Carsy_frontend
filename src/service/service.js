import axios from "axios";

const myApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

myApi.getUserInfos = async () => {
  return myApi
    .get("/auth/verify")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

myApi.signup = async (userInfos) => {
  return await myApi.post("/auth/signup", userInfos);
};

myApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return request;
  } else {
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  }
});

export default myApi;
