// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Backend Root URL
  withCredentials: false, // no cookies needed for JWT token
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
