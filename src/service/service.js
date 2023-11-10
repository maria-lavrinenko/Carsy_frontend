import axios from "axios";

const myApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

myApi.getUserInfos = async () => {
  return myApi
    .get("/auth/verify")
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => console.log(error));
};

myApi.signup = async (userInfos) => {
  return await myApi.post("/auth/signup", userInfos);
};

myApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken");
  console.log(token);
  if (!token) return request;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default myApi;
