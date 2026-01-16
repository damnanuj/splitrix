import { scale } from "src/utils/functions/dimensions";
import { Avatar, XStack, YStack, Stack } from "tamagui";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { Activity } from "src/stores/types";
import { formatDate, formatTime } from "src/utils/functions/formatDate";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import ICONS from "src/utils/icons";
import { Users, Plus, Receipt } from "@tamagui/lucide-icons";

interface ActivityItemProps {
  activity: Activity;
}

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "group_joined":
      return Users;
    case "group_created":
      return Plus;
    case "bill_added":
      return Receipt;
    default:
      return Users;
  }
};

const getActivityIconColor = (type: Activity["type"]) => {
  switch (type) {
    case "group_joined":
      return "$blue10";
    case "group_created":
      return "$green10";
    case "bill_added":
      return "$accentYellow";
    default:
      return "$textSecondary";
  }
};

const getAvatarSource = (name: string, profilePicture?: string) => {
  return (
    profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "User"
    )}&background=2f3640&color=ffffff`
  );
};

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const router = useRouter();
  const Icon = getActivityIcon(activity.type);
  const iconColor = getActivityIconColor(activity.type);

  const handlePress = () => {
    if (activity.group?._id) {
      router.push({
        pathname: "/groupDetails",
        params: { groupId: activity.group._id },
      });
    }
  };

  const formattedDate = formatDate(activity.createdAt);
  const formattedTime = formatTime(activity.createdAt);

  return (
    <Pressable onPress={handlePress}>
      <XStack
        bg="$backgroundSecondary"
        borderColor="$borderPrimary"
        borderWidth={1}
        rounded={scale(12)}
        gap={scale(16)}
        items="center"
        py={scale(16)}
        px={scale(16)}
        mb={scale(12)}
        pressStyle={{
          opacity: 0.8,
          scale: 0.98,
          bg: "$backgroundHover",
        }}
        animation="quick"
      >
        {/* Icon Container */}
        <Stack
          bg="$background"
          width={scale(48)}
          height={scale(48)}
          rounded={scale(12)}
          justify="center"
          items="center"
          borderWidth={1}
          borderColor="$borderPrimary"
        >
          <Icon size={scale(22)} color={iconColor} />
        </Stack>

        {/* Content */}
        <YStack flex={1} gap={scale(4)}>
          {/* Summary */}
          <MyText
            color="$textPrimary"
            style={{ fontFamily: "MPlusRounded700" }}
            fontSize={scale(15)}
            numberOfLines={2}
            lineHeight={scale(18)}
          >
            {activity.summary}
          </MyText>

          {/* Group Name */}
          {activity.group?.name && (
            <XStack items="center" gap={scale(6)}>
              <Avatar size={scale(20)} rounded={scale(6)}>
                <Avatar.Image
                  accessibilityLabel={activity.group.name}
                  src={
                    activity.group.avatar ||
                    getAvatarSource(activity.group.name)
                  }
                />
                <Avatar.Fallback delayMs={600} backgroundColor="#444" />
              </Avatar>
              <MyText
                color="$textSecondary"
                fontSize={scale(13)}
                numberOfLines={1}
              >
                {activity.group.name}
              </MyText>
            </XStack>
          )}

          {/* Actor Info */}
          {activity.actor && (
            <XStack items="center" gap={scale(6)} mt={scale(2)}>
              <Avatar size={scale(20)} rounded={scale(6)}>
                <Avatar.Image
                  accessibilityLabel={activity.actor.name}
                  src={getAvatarSource(
                    activity.actor.name,
                    activity.actor.profilePicture
                  )}
                />
                <Avatar.Fallback delayMs={600} backgroundColor="#444" />
              </Avatar>
              <MyText color="$textSecondary" fontSize={scale(12)}>
                {activity.actor.name}
              </MyText>
            </XStack>
          )}

          {/* Amount for bill_added */}
          {activity.type === "bill_added" && activity.data?.amount && (
            <MyText
              color="$accentYellow"
              fontSize={scale(14)}
              style={{ fontFamily: "MPlusRounded700" }}
              mt={scale(2)}
            >
              ₹{activity.data.amount.toFixed(2)}
            </MyText>
          )}
        </YStack>

        {/* Time */}
        <YStack items="flex-end" gap={scale(2)}>
          <MyText color="$textSecondary" fontSize={scale(11)}>
            {formattedDate}
          </MyText>
          <MyText color="$textSecondary" fontSize={scale(11)}>
            {formattedTime}
          </MyText>
        </YStack>
      </XStack>
    </Pressable>
  );
};

