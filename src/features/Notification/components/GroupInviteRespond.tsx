import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { Button, Stack, XStack, YStack } from "tamagui";
import { Notification } from "src/stores/types";
import Feather from "@expo/vector-icons/Feather";
import { formatDate, formatTime } from "src/utils/functions/formatDate";
import ICONS from "src/utils/icons";
import { Image } from "tamagui";

export const GroupInviteRespond = ({
  notification,
}: {
  notification: Notification;
}) => {
  console.log("notification", notification);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getMemberCount = () => {
    return notification.data.groupMembers?.length || 1;
  };

  const getMemberNames = () => {
    const members = notification.data.groupMembers || [];
    if (members.length <= 2) {
      return members.map((member) => member.name).join(", ");
    }
    return `${members
      .slice(0, 2)
      .map((member) => member.name)
      .join(", ")} and ${members.length - 2} more`;
  };

  return (
    <YStack gap={scale(24)} items="center" px={scale(20)}>
      {/* Header with Icon and Title */}
      <YStack items="center" gap={scale(16)}>
        <Stack
          bg="$blue4"
          width={scale(80)}
          height={scale(80)}
          rounded={scale(24)}
          justify="center"
          items="center"
          borderWidth={2}
          borderColor="$blue8"
          shadowColor="$blue8"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          // elevation={8}
        >
          {/* <Feather name="users" size={scale(32)} color="#3498db" /> */}
          <Image
            source={{ uri: ICONS.defaultGroup }}
            width={scale(50)}
            height={scale(50)}
          />
        </Stack>

        <YStack items="center" gap={scale(4)}>
          <MyText
            color="$textPrimary"
            style={{ fontFamily: "MPlusRounded700", textAlign: "center" }}
            fontSize={scale(22)}
          >
            Group Invitation
          </MyText>
          <MyText
            color="$textSecondary"
            style={{ fontFamily: "MPlusRounded400", textAlign: "center" }}
            fontSize={scale(13)}
          >
            {formatDate(notification.createdAt)} at{" "}
            {formatTime(notification.createdAt)}
          </MyText>
        </YStack>
      </YStack>

      {/* Invitation Message */}
      <YStack
        bg="$blue2"
        p={scale(16)}
        rounded={scale(16)}
        width="100%"
        borderWidth={1}
        borderColor="$blue6"
      >
        <MyText
          color="$textPrimary"
          style={{ fontFamily: "MPlusRounded500", textAlign: "center" }}
          fontSize={scale(16)}
          lineHeight={scale(24)}
        >
          {notification.message}
        </MyText>
      </YStack>

      {/* Group Details Card */}
      <YStack
        bg="$background"
        p={scale(20)}
        rounded={scale(20)}
        width="100%"
        borderWidth={1}
        borderColor="$borderColor"
        gap={scale(16)}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        elevation={4}
      >
        {/* Group Name and Description */}
        <YStack gap={scale(8)}>
          <XStack items="center" gap={scale(12)}>
            <Stack
              bg="$blue3"
              width={scale(40)}
              height={scale(40)}
              rounded={scale(12)}
              justify="center"
              items="center"
            >
              {/* <Feather name="users" size={scale(20)} color="#3498db" /> */}
              <Image
                source={{
                  uri: notification.data.groupAvatar || ICONS.defaultGroup,
                }}
                width={scale(25)}
                height={scale(25)}
                // rounded={scale(12)}
              />
            </Stack>
            <YStack flex={1}>
              <MyText
                color="$textPrimary"
                style={{ fontFamily: "MPlusRounded700" }}
                fontSize={scale(18)}
              >
                {notification.data.groupName || "Group"}
              </MyText>
              {notification.data.groupDescription && (
                <MyText
                  color="$textSecondary"
                  style={{ fontFamily: "MPlusRounded400" }}
                  fontSize={scale(14)}
                >
                  {notification.data.groupDescription}
                </MyText>
              )}
            </YStack>
          </XStack>
        </YStack>

        {/* Group Creator */}
        <YStack gap={scale(8)}>
          <MyText
            color="$textSecondary"
            style={{ fontFamily: "MPlusRounded500" }}
            fontSize={scale(13)}
          >
            Created by
          </MyText>
          <XStack items="center" gap={scale(12)}>
            <Image
              source={{
                uri:
                  notification.data.groupCreator?.profilePicture ||
                  ICONS.defaultUser,
              }}
              width={scale(35)}
              height={scale(35)}
              rounded={scale(18)}
            />

            <YStack flex={1}>
              <MyText
                color="$textPrimary"
                style={{ fontFamily: "MPlusRounded600" }}
                fontSize={scale(15)}
              >
                {notification.data.groupCreator?.name ||
                  notification.data.inviterName ||
                  "Unknown"}
              </MyText>
              {/* <MyText
                color="$textSecondary"
                style={{ fontFamily: "MPlusRounded400" }}
                fontSize={scale(12)}
              >
                {notification.data.groupCreator?.email ||
                  notification.data.inviterEmail ||
                  ""}
              </MyText> */}
            </YStack>
          </XStack>
        </YStack>

        {/* Group Members */}
        <YStack gap={scale(8)}>
          <XStack items="center" justify="space-between">
            <MyText
              color="$textSecondary"
              style={{ fontFamily: "MPlusRounded500" }}
              fontSize={scale(13)}
            >
              Members ({getMemberCount()})
            </MyText>
            <XStack items="center" gap={scale(4)}>
              <Feather name="users" size={scale(14)} color="#3498db" />
              <MyText
                color="$blue11"
                style={{ fontFamily: "MPlusRounded500" }}
                fontSize={scale(12)}
              >
                {getMemberCount()} member{getMemberCount() !== 1 ? "s" : ""}
              </MyText>
            </XStack>
          </XStack>

          <MyText
            color="$textPrimary"
            style={{ fontFamily: "MPlusRounded400" }}
            fontSize={scale(14)}
            lineHeight={scale(20)}
          >
            {getMemberNames()}
          </MyText>
        </YStack>
      </YStack>

      {/* Action Buttons */}
      <XStack gap={scale(16)} width="100%">
        <Button
          flex={1}
          bg="$red9"
          borderColor="$red8"
          borderWidth={1}
          rounded={scale(16)}
          height={scale(56)}
          py={scale(18)}
          px={scale(16)}
          pressStyle={{
            bg: "$red10",
            scale: 0.98,
          }}
          animation="quick"
          shadowColor="$red8"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          elevation={4}
        >
          <XStack items="center" gap={scale(8)}>
            <Feather name="x" size={scale(18)} color="white" />
            <MyText
              color="white"
              style={{ fontFamily: "MPlusRounded600" }}
              fontSize={scale(15)}
              lineHeight={scale(20)}
            >
              Decline
            </MyText>
          </XStack>
        </Button>

        <Button
          flex={1}
          bg="$green9"
          borderColor="$green8"
          borderWidth={1}
          rounded={scale(16)}
          height={scale(56)}
          py={scale(18)}
          px={scale(16)}
          pressStyle={{
            bg: "$green10",
            scale: 0.98,
          }}
          animation="quick"
          shadowColor="$green8"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          elevation={4}
        >
          <XStack items="center" gap={scale(8)}>
            <Feather name="check" size={scale(18)} color="white" />
            <MyText
              color="white"
              style={{ fontFamily: "MPlusRounded600" }}
              fontSize={scale(15)}
              lineHeight={scale(20)}
            >
              Accept
            </MyText>
          </XStack>
        </Button>
      </XStack>
    </YStack>
  );
};
