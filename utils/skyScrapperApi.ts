import axios from "axios";

const API_HOST = "sky-scrapper.p.rapidapi.com";
const API_KEY = "43f74d5285msh21775a334555ffbp19a298jsn9fac09ff84f0";

const api = axios.create({
  baseURL: `https://${API_HOST}/api/v1/flights`,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
});

export default api;
