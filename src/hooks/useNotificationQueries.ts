import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadCount,
} from "src/services/notification.service";
import { useNotificationStore } from "src/stores/notificationStore";
import apiService from "src/services/api.service";
import { API_ENDPOINTS } from "src/config/api.config";

// Query keys for consistent caching
export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...notificationKeys.lists(), { filters }] as const,
  unreadCount: () => [...notificationKeys.all, "unreadCount"] as const,
};

// Custom hook for notifications with TanStack Query + Zustand integration
export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { setNotifications, setUnreadCount, setError, clearError } =
    useNotificationStore();

  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: async () => {
      try {
        const response = await getNotifications();

        if (response.success) {
          const { notifications, unreadCount } = response.data;

          // Update Zustand store for instant UI updates
          setNotifications(notifications);
          setUnreadCount(unreadCount);
          clearError();

          return response.data;
        } else {
          throw new Error(response.msg || "Failed to fetch notifications");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.msg ||
          error.message ||
          "Failed to fetch notifications";
        setError(errorMessage);
        throw error;
      }
    },
    // Use global defaults (staleTime: 5 min, gcTime: 10 min, retry: 1)
  });
};

// Custom hook for unread count
export const useUnreadCount = (options?: { enabled?: boolean }) => {
  const { setUnreadCount } = useNotificationStore();

  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: async () => {
      try {
        const response = await getUnreadCount();

        if (response.success) {
          setUnreadCount(response.data.unreadCount);
          return response.data;
        } else {
          throw new Error(response.msg || "Failed to fetch unread count");
        }
      } catch (error: any) {
        // Don't set error state for unread count to avoid disrupting UX
        throw error;
      }
    },
    // Use global defaults, but override staleTime for more frequent updates
    staleTime: 2 * 60 * 1000, // 2 minutes (more frequent than global 5 min)
    enabled: options?.enabled ?? true, // Default to true if not specified
  });
};

// Mutation hook for marking a single notification as read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const { updateNotifications } = useNotificationStore();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await apiService.put(
        API_ENDPOINTS.notification.markAsRead(notificationId)
      );
      return response.data;
    },
    onSuccess: (data, notificationId) => {
      // Update the local state immediately for instant UI update
      updateNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, readAt: new Date().toISOString() }
            : notification
        )
      );

      // Invalidate and refetch queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
    onError: (error) => {
      console.error("Failed to mark notification as read:", error);
    },
  });
};

// Mutation hook for marking all notifications as read
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { updateNotifications } = useNotificationStore();

  return useMutation({
    mutationFn: async () => {
      const response = await apiService.put(
        API_ENDPOINTS.notification.markAllAsRead
      );
      return response.data;
    },
    onSuccess: () => {
      // Update the local state immediately for instant UI update
      updateNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          readAt: notification.readAt || new Date().toISOString(),
        }))
      );

      // Invalidate and refetch queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
    onError: (error) => {
      console.error("Failed to mark all notifications as read:", error);
    },
  });
};

// Utility function to invalidate notifications cache
export const useInvalidateNotifications = () => {
  const queryClient = useQueryClient();

  return {
    invalidateNotifications: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
    invalidateUnreadCount: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
    },
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  };
};
