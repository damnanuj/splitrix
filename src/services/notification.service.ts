import apiService from "./api.service";
import { API_ENDPOINTS } from "src/config/api.config";
import { NotificationResponse, UnreadCountResponse } from "src/stores/types";

export const getNotifications = async (): Promise<NotificationResponse> => {
  const response = await apiService.get(API_ENDPOINTS.notification.list);
  return response.data;
};

// Mark a specific notification as read
// router.put("/:notificationId/read", isAuthenticated, markNotificationAsRead);

// // Mark all notifications as read
// router.put("/read-all", isAuthenticated, markAllNotificationsAsRead);

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const response = await apiService.put(
    API_ENDPOINTS.notification.markAsRead(notificationId)
  );
  return response.data;
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  const response = await apiService.put(
    API_ENDPOINTS.notification.markAllAsRead
  );
  return response.data;
};

export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
  try {
    const response = await apiService.get(
      API_ENDPOINTS.notification.unreadCount
    );
    return response.data;
  } catch (error) {
    console.error("getUnreadCount error:", error);
    throw error;
  }
};
