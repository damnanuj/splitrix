import { scale } from "src/utils/functions/dimensions";
import { Image, Stack, XStack, YStack } from "tamagui";
import Feather from "@expo/vector-icons/Feather";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import { Notification } from "src/stores/types";
import { formatDate } from "src/utils/functions/formatDate";
import { ModalSheet } from "src/components/common/ModalSheet";
import { useState } from "react";
import { GroupInviteRespond } from "./GroupInviteRespond";
import ICONS from "src/utils/icons";

interface NotificationItemProps {
  notification: Notification;
  onPress?: () => void;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "invite_sent":
      return { name: "user-plus", color: "#3498db" };
    case "invite_accepted":
      return { name: "check-circle", color: "#2ecc71" };
    case "invite_declined":
      return { name: "x-circle", color: "#e74c3c" };
    case "expense_added":
      return { name: "plus-circle", color: "#f39c12" };
    case "expense_updated":
      return { name: "edit", color: "#9b59b6" };
    case "payment_received":
      return { name: "arrow-down-circle", color: "#2ecc71" };
    case "payment_sent":
      return { name: "arrow-up-circle", color: "#e74c3c" };
    default:
      return { name: "bell", color: "#95a5a6" };
  }
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { name: iconName, color: iconColor } = getNotificationIcon(
    notification.type
  );
  const isUnread = !notification.readAt;
  const [sheetOpen, setSheetOpen] = useState(false);

  const handlePress = () => {
    // Only open sheet for group invite notification
    setSheetOpen(true);
  };

  return (
    <>
      <XStack
        onPress={handlePress}
        bg={isUnread ? "$blue2" : "$background"}
        borderColor={isUnread ? "$blue6" : "$borderColor"}
        borderWidth={1}
        rounded={scale(12)}
        gap={scale(16)}
        items="center"
        py={scale(16)}
        px={scale(16)}
        mb={scale(8)}
        pressStyle={{
          opacity: 0.8,
          scale: 0.98,
          bg: isUnread ? "$blue3" : "$backgroundHover",
        }}
        animation="quick"
        cursor="pointer"
        shadowColor={isUnread ? "$blue8" : "$shadowColor"}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={isUnread ? 0.1 : 0.05}
        shadowRadius={4}
        elevation={isUnread ? 2 : 1}
      >
        {/* Icon Container */}
        <Stack
          bg={isUnread ? "$blue4" : "$backgroundSecondary"}
          width={scale(48)}
          height={scale(48)}
          rounded={scale(12)}
          justify="center"
          items="center"
          borderWidth={isUnread ? 1 : 0}
          borderColor="$blue8"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.2}
          shadowRadius={2}
        >
          {/* <Feather name={iconName as any} size={scale(22)} color={iconColor} /> */}
          <Image
            source={{ uri: ICONS.defaultGroup }}
            width={scale(22)}
            height={scale(22)}
          />
        </Stack>

        {/* Content */}
        <YStack flex={1} gap={scale(4)}>
          {/* Title Row */}
          <XStack items="center" justify="space-between">
            <MyText
              color={isUnread ? "$textPrimary" : "$textSecondary"}
              style={{ fontFamily: "MPlusRounded700" }}
              fontSize={scale(15)}
              numberOfLines={1}
              flex={1}
            >
              {notification.title}
            </MyText>

            {/* Unread indicator */}
            {isUnread && (
              <Stack
                width={scale(8)}
                height={scale(8)}
                bg="$blue9"
                rounded={scale(4)}
                animation="bouncy"
              />
            )}
          </XStack>

          {/* Message */}
          <MyText
            color={isUnread ? "$textPrimary" : "$textSecondary"}
            style={{ fontFamily: "MPlusRounded400" }}
            fontSize={scale(13)}
            numberOfLines={2}
            lineHeight={scale(18)}
          >
            {notification.message}
          </MyText>

          {/* Group Context */}
          {notification.type === "invite_sent" &&
            notification.data.groupName && (
              <XStack
                bg="$blue3"
                px={scale(8)}
                py={scale(4)}
                rounded={scale(6)}
                items="center"
                gap={scale(4)}
              >
                {/* <Feather name="users" size={scale(12)} color="#3498db" /> */}
                <Image
                  source={{ uri: ICONS.defaultGroup }}
                  width={scale(12)}
                  height={scale(12)}
                />
                <MyText
                  color="$blue11"
                  style={{ fontFamily: "MPlusRounded500" }}
                  fontSize={scale(11)}
                >
                  {notification.data.groupName}
                </MyText>
              </XStack>
            )}

          {/* Time */}
          {/* <XStack items="center" gap={scale(6)}>
          <Feather name="clock" size={scale(10)} color="#95a5a6" />
          <MyText
            color="$textSecondary"
            style={{ fontFamily: "MPlusRounded400" }}
            fontSize={scale(11)}
          >
            {formatDate(notification.createdAt)}
          </MyText>
        </XStack> */}
        </YStack>
      </XStack>

      {/* Modal Sheet for group invite notifications */}
      {notification.type === "invite_sent" && (
        <ModalSheet
          snapPoints={[80]}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          // animation="quick"
          // overlayAnimation="quick"
        >
          {/* {sheetOpen && <GroupInviteRespond notification={notification} />} */}
          <GroupInviteRespond notification={notification} />
        </ModalSheet>
      )}
    </>
  );
};
