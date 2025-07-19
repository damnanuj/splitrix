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
      const token =
        (await AsyncStorage.getItem("token")) ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2IzMTRmYzgwZjkwYWM5NTRkYzBmMyIsImVtYWlsIjoiYW51amtyZ3VwdGEyMUBnbWFpbC5jb20iLCJpYXQiOjE3NTI5MTc0MjksImV4cCI6MTc1MzUyMjIyOX0.Bo37d2_f5xgRPtE4jq5NSZUFH_-HTUeRCRbjYfRZHYI";
      //   console.log(token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      //   console.log(config);
      return config;
    } catch (error) {
      throw error;
      console.error("Token fetch error:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
