import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Automatically attach the token if available
  apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
  
  export default apiClient;