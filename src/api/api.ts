import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "src/utils/constants/env";
export const baseURL = ENV.EXPO_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
