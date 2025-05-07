import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
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
},
  (error) => Promise.reject(error)
)

// Response Interceptor: handle expired token or unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: clear token
      localStorage.removeItem('token');

      // Optional: toast message
      toast.error('Session expired. Please login again.');

      // Redirect to login
      window.location.href = '/sign-in';
    }

    return Promise.reject(error);
  }
)


export default apiClient;