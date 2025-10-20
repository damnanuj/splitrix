import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "src/utils/constants/env";
export const baseURL = ENV.EXPO_PUBLIC_BASE_URL;

const apiService = axios.create({
  baseURL: baseURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      const parsedToken = token ? JSON.parse(token) : null;
      // console.log(parsedToken, "-<<<<<<token");
      if (parsedToken) {
        config.headers["Authorization"] = `Bearer ${parsedToken}`;
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

export default apiService;
