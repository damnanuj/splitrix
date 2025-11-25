import { Circle, Image, Stack, useTheme, XStack, YStack } from "tamagui";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import themeColors from "src/utils/theme/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { scale } from "src/utils/functions/dimensions";
import { Avatar } from "tamagui";
import { useRouter } from "expo-router";
import { useAuthStore } from "src/stores/authStore";
import { useNotificationStore } from "src/stores/notificationStore";
import ICONS from "src/utils/icons";
import { useUnreadCount } from "src/hooks/notification/useUnreadCount";

const UserHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const { authData }: any = useAuthStore();

  const { data: unreadCount = 0, isLoading } = useUnreadCount();

  // console.log(unreadCount, "unreadCount");

  return (
    <XStack
      items={"center"}
      borderBottomWidth={1}
      borderBottomColor={"$borderColor"}
      py={scale(15)}
      gap={scale(15)}
    >
      <Avatar circular size={scale(50)}>
        <Avatar.Image src={authData?.profilePicture || ICONS.defaultUser} />
        <Avatar.Fallback delayMs={600} backgroundColor="lightgray" />
      </Avatar>
      <YStack
        flex={1}
        // borderWidth={1}
        borderColor={"white"}
      >
        <MyText
          color={"$textPrimary"}
          style={{ fontFamily: "MPlusRounded700" }}
          fontSize={scale(21)}
        >
          Hi, {authData?.name}!
        </MyText>

        <MyText fontSize={scale(12)} color={"$textSecondary"}>
          Easily split bills & track expenses
        </MyText>
      </YStack>

      <XStack
        onPress={() => {
          router.push("/notification");
        }}
        bg={"$backgroundSecondary"}
        p={scale(12)}
        rounded={scale(10)}
        pressStyle={{ opacity: 0.8 }}
        animation="quick"
        items="center"
        gap={scale(8)}
      >
        <FontAwesome5 name="bell" size={20} color={theme.textPrimary.val} />

        {/* Unread count badge */}
        {unreadCount > 0 && !isLoading && (
          <Stack
            position="absolute"
            bg="$red9"
            rounded={scale(10)}
            width={scale(18)}
            height={scale(18)}
            items="center"
            justify="center"
            animation="bouncy"
            px={scale(2)}
            borderWidth={0}
            style={{ top: scale(1), right: scale(1) }}
          >
            <MyText
              color="white"
              fontSize={scale(10)}
              style={{ fontFamily: "MPlusRounded700" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount || 0}
            </MyText>
          </Stack>
        )}
      </XStack>
    </XStack>
  );
};

export default UserHeader;
