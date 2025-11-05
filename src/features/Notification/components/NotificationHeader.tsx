import { XStack, YStack } from "tamagui";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import Feather from "@expo/vector-icons/Feather";
import { useUnreadCount } from "src/hooks/notification/useUnreadCount";

export const NotificationHeader = () => {
  const { data: unreadCount = 0, isLoading } = useUnreadCount();

  return (
    <XStack items="center" justify="flex-end" py={scale(12)} px={scale(5)}>
      {unreadCount > 0 && !isLoading && (
        <XStack
          items="center"
          gap={scale(8)}
          bg="$blue3"
          px={scale(12)}
          py={scale(6)}
          rounded={scale(20)}
          borderWidth={1}
          borderColor="$blue6"
        >
          <Feather name="bell" size={scale(14)} color="#3498db" />
          <MyText
            color="$blue11"
            style={{ fontFamily: "MPlusRounded600" }}
            fontSize={scale(13)}
          >
            {unreadCount} unread
          </MyText>
        </XStack>
      )}
    </XStack>
  );
};
