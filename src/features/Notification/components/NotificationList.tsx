import { useEffect } from "react";
import { ScrollView, YStack } from "tamagui";
import { useNotificationStore } from "src/stores/notificationStore";
import { NotificationItem } from "./NotificationItem";
import { DateHeader } from "./DateHeader";
import LoaderWithText from "src/components/common/LoaderWithText";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import {
  groupNotificationsByDate,
  getSortedDateKeys,
} from "src/utils/functions/groupNotificationsByDate";
import ExpensesHistory from "./ExpensesHistory";

export const NotificationList = () => {
  const { notifications, isLoading, error, fetchNotifications, clearError } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (isLoading) {
    return <LoaderWithText text="Loading notifications..." />;
  }

  if (error) {
    return (
      <YStack flex={1} justify="center" items="center" gap={scale(20)}>
        <MyText color="$red10" style={{ fontFamily: "MPlusRounded500" }}>
          {error}
        </MyText>
        <MyText
          color="$blue10"
          style={{ fontFamily: "MPlusRounded400" }}
          onPress={() => {
            clearError();
            fetchNotifications();
          }}
          cursor="pointer"
        >
          Tap to retry
        </MyText>
      </YStack>
    );
  }

  if (notifications.length === 0) {
    return (
      <YStack flex={1} justify="center" items="center" gap={scale(20)}>
        <MyText
          color="$textSecondary"
          style={{ fontFamily: "MPlusRounded500" }}
        >
          No notifications yet
        </MyText>
        <MyText
          color="$textSecondary"
          style={{ fontFamily: "MPlusRounded400" }}
        >
          You'll see notifications here when you receive them
        </MyText>
      </YStack>
    );
  }

  // Group notifications by date
  const groupedNotifications = groupNotificationsByDate(notifications);
  const sortedDateKeys = getSortedDateKeys(groupedNotifications);

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false} pb={scale(20)}>
      <YStack gap={scale(16)}>
        {sortedDateKeys.map((dateKey) => (
          <YStack key={dateKey} gap={scale(8)}>
            <DateHeader
              dateLabel={dateKey}
              notificationCount={groupedNotifications[dateKey].length}
            />
            {groupedNotifications[dateKey].map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
          </YStack>
        ))}
      </YStack>

      <ExpensesHistory />
    </ScrollView>
  );
};
