import axios, { AxiosError } from "axios";

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosServices;