import { API_ENDPOINTS } from "src/config/api.config";
import apiService from "./api.service";

export const getUserData = async () => {
  const response = await apiService.get(API_ENDPOINTS.user.get);
  return response.data;
};

export const getUserById = async (id: any) => {
  const response = await apiService.get(API_ENDPOINTS.user.getById(id));
  return response.data;
};
