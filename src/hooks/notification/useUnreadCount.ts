import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "src/services/notification.service";

export const useUnreadCount = () => {
  return useQuery<number, Error>({
    queryKey: ["notifications", "unreadCount"],
    queryFn: async () => {
      const res = await getUnreadCount();
      if (res.success) return res.data.unreadCount || 0;
      throw new Error(res.msg || "Failed to fetch unread count");
    },
    staleTime: 1000 * 60 * 1, // 1 min
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
