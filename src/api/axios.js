// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("AXIOS FILE LOADED SUCCESSFULLY", api.defaults.baseURL);

export default api;
