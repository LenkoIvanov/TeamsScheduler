import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let msg = "Unexptected error!";
    if (error.response && error.response.status === 404) {
      msg = "Response not found! Please check the API requests.";
    }
    console.error(msg);
    return error;
  }
);

export default axiosInstance;
