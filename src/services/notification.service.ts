import apiService from "./api.service";
import { API_ENDPOINTS } from "src/config/api.config";
import { NotificationResponse, UnreadCountResponse } from "src/stores/types";

export const getNotifications = async (): Promise<NotificationResponse> => {
  const response = await apiService.get(API_ENDPOINTS.notification.list);
  return response.data;
};

export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
  try {
    const response = await apiService.get(
      API_ENDPOINTS.notification.unreadCount
    );
    return response.data;
  } catch (error) {
    // Fallback: if the endpoint doesn't exist, return 0
    console.warn("Unread count endpoint not available, returning 0");
    return {
      success: false,
      msg: "Unread count endpoint not available",
      data: { unreadCount: 0 },
    };
  }
};
