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

export const getAllUsers = async () => {
  const response = await apiService.get(API_ENDPOINTS.user.list);
  // Normalized to always return { success, msg, data }
  return response.data;
};

export const addFriend = async (friendId: string) => {
  const response = await apiService.post(API_ENDPOINTS.user.addFriend, {
    friendId,
  });
  return response.data;
};

export const getFriendsList = async () => {
  const response = await apiService.get(API_ENDPOINTS.user.friendsList);
  return response.data;
};
