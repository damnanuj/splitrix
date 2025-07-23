// utils/axiosInstance.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const baseURL = "http://192.168.31.53:8000/api";
// Create Axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      //   console.log(token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      //   console.log(config);
      return config;
    } catch (error) {
      console.error("Token fetch error:", error);
      throw error;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
