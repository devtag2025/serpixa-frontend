// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true, 
});

// Request interceptor to attach token if present
api.interceptors.request.use(
  (config) => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // Response interceptor example (optional global error / refresh logic)
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     // Example: if unauthorized, you could attempt token refresh here
//     // keep simple for now:
//     return Promise.reject(error);
//   }
// );

export default api;
