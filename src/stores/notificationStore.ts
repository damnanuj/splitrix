import { create } from "zustand";
import { NotificationState } from "./types";

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  // Zustand store now acts as a state container for instant UI updates
  // TanStack Query handles the actual data fetching and caching
  setNotifications: (notifications) => {
    set({ notifications });
  },

  updateNotifications: (updater) => {
    set((state) => ({ notifications: updater(state.notifications) }));
  },

  setUnreadCount: (unreadCount) => {
    set({ unreadCount });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  // Legacy methods for backward compatibility (can be removed later)
  fetchNotifications: async () => {
    // This method is now handled by TanStack Query hooks
    console.warn(
      "fetchNotifications is deprecated. Use useNotifications hook instead."
    );
  },

  fetchUnreadCount: async () => {
    // This method is now handled by TanStack Query hooks
    console.warn(
      "fetchUnreadCount is deprecated. Use useUnreadCount hook instead."
    );
  },
}));
