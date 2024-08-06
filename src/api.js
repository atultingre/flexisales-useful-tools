// src/api.js
import axios from "axios";

const API = axios.create({
  // baseURL: "http://192.168.0.106:5000/api",
  baseURL: "https://email-marketing-campaigns-backend.onrender.com/api",
});

// Add a request interceptor to include the token in all requests
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// User APIs
export const login = (employeeId, password) =>
  API.post("/users/login", { employeeId, password });

export const signup = (name, employeeId, password) =>
  API.post("/users/signup", { name, employeeId, password });

// Campaign APIs
export const getCampaigns = () => API.get("/campaigns");

export const createCampaign = (campaignData) =>
  API.post("/campaigns", campaignData);

export const updateCampaign = (id, campaignData) =>
  API.put(`/campaigns/${id}`, campaignData);

export const deleteCampaign = (id) => API.delete(`/campaigns/${id}`);
