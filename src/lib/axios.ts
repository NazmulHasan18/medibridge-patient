import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error.response?.data?.message || error.message || "Something went wrong");
  },
);

export default axiosInstance;
