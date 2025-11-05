import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "src/services/notification.service";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const res = await markNotificationAsRead(notificationId);
      if (res.success) return res.notificationId;
      throw new Error(res.msg || "Failed to mark as read");
    },

    onSuccess: (_, notificationId) => {
      // 1️⃣ Update cached notifications list
      queryClient.setQueryData(["notifications"], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((n: any) =>
          n._id === notificationId
            ? { ...n, readAt: new Date().toISOString() }
            : n
        );
      });

      // 2️⃣ Update cached unread count instantly
      queryClient.setQueryData(
        ["notifications", "unreadCount"],
        (oldCount: number | undefined) => {
          if (typeof oldCount !== "number") return 0;
          return Math.max(oldCount - 1, 0);
        }
      );
    },
  });
};
