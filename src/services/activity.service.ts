import apiService from "./api.service";
import { API_ENDPOINTS } from "src/config/api.config";
import { ActivityResponse } from "src/stores/types";

export const getActivities = async (): Promise<ActivityResponse> => {
  const response = await apiService.get(API_ENDPOINTS.activity.me);
  return response.data;
};

