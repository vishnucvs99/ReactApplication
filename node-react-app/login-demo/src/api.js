// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");

// Configure Axios with base URL and token
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// API requests
export const loginUser = (username, password) =>
  api.post("/login", { username, password });

export const registerUser = (userData) => api.post("/users", userData);

export const updateUser = async (userId, userData, token) => {
  return axios.put(
    `/users/${userId}`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token here
      },
    }
  );
};

export const deleteUser = (userId) => api.delete(`/users/${userId}`);
