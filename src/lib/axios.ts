import axios from "axios";

export const baseURL = "http://localhost:4000/api/v1";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

export default axiosInstance;
