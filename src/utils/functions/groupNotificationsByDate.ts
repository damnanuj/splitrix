import { Notification } from "src/stores/types";

export interface GroupedNotifications {
  [key: string]: Notification[];
}

export const groupNotificationsByDate = (
  notifications: Notification[]
): GroupedNotifications => {
  const grouped: GroupedNotifications = {};

  notifications.forEach((notification) => {
    const dateKey = getDateKey(notification.createdAt);

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(notification);
  });

  // Sort notifications within each group by creation time (newest first)
  Object.keys(grouped).forEach((dateKey) => {
    grouped[dateKey].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });

  return grouped;
};

const getDateKey = (dateStr: string): string => {
  const inputDate = new Date(dateStr);
  const today = new Date();

  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  // For other dates, return formatted date string
  return inputDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getSortedDateKeys = (
  groupedNotifications: GroupedNotifications
): string[] => {
  const dateKeys = Object.keys(groupedNotifications);

  // Custom sort order: Today, Yesterday, then by date (newest first)
  return dateKeys.sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;

    // For other dates, sort by actual date (newest first)
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });
};
