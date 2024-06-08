import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "./urls";

const axiosInstance = axios.create({
  baseURL: baseURL,
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
    toast.error(msg);
    return error;
  }
);

export default axiosInstance;
