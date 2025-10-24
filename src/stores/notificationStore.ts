import { create } from "zustand";
import {
  getNotifications,
  getUnreadCount,
} from "src/services/notification.service";
import { NotificationState } from "./types";

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await getNotifications();

      if (response.success) {
        const { notifications, unreadCount } = response.data;
        set({
          notifications,
          unreadCount,
          isLoading: false,
        });
      } else {
        set({
          error: response.msg || "Failed to fetch notifications",
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.error("fetchNotifications error:", error);
      set({
        error:
          error.response?.data?.msg ||
          error.message ||
          "Failed to fetch notifications",
        isLoading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  fetchUnreadCount: async () => {
    try {
      const response = await getUnreadCount();
      set({ unreadCount: response.data.unreadCount });
    } catch (error: any) {
      console.error("fetchUnreadCount error:", error);
      // Don't set error state for unread count fetch to avoid disrupting UX
    }
  },
}));
