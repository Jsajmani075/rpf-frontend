import axios from "axios";

const api = axios.create({
  baseURL: "https://api-dev-rpf.onrender.com",
});

export default api;
