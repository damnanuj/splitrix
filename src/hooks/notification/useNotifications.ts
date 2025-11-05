import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "src/services/notification.service";
import { Notification } from "src/stores/types";

export const useNotifications = () => {
  return useQuery<Notification[], Error>({
    queryKey: ["notifications"],
    queryFn: async (): Promise<Notification[]> => {
      const res = await getNotifications();
      if (res.success) {
        return Array.isArray(res.data) ? res.data : [];
      }
      throw new Error(res.msg || "Failed to fetch notifications");
    },
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
