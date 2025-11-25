import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { Button, Stack, useTheme, XStack, YStack } from "tamagui";
import Feather from "@expo/vector-icons/Feather";
import { formatDate, formatTime } from "src/utils/functions/formatDate";
import ICONS from "src/utils/icons";
import { Image } from "tamagui";
import { useGroupDetails } from "src/hooks/group/useGroupDetails";
import { router } from "expo-router";
import GroupInviteRespondSkeleton from "./skeleton/GroupInviteRespondSkeleton";

export const GroupInviteRespond = ({
  groupId,
  onClose,
  notificationReceivedAt,
  notificationType,
}: {
  groupId: string;
  onClose?: () => void;
  notificationReceivedAt?: string;
  notificationType?: string;
}) => {
  const { data: groupDetails, isLoading } = useGroupDetails(groupId);
  const theme = useTheme();

  const handleVisitGroup = () => {
    onClose?.();
    router.push({
      pathname: "/groupDetails",
      params: { groupId },
    });
  };

  const isGroupAdded = notificationType === "group_added";

  if (isLoading) {
    return <GroupInviteRespondSkeleton />;
  }

  return (
    <YStack
      gap={scale(24)}
      items="center"
      px={scale(20)}
      // borderWidth={1}
      borderColor="blue"
    >
      {/* Header with Icon and Title */}
      <YStack
        items="center"
        gap={scale(16)}
        // borderWidth={1}
        borderColor="green"
      >
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

        <YStack items="center" borderColor="red">
          <MyText
            color="$textPrimary"
            style={{ fontFamily: "MPlusRounded700", textAlign: "center" }}
            fontSize={scale(22)}
          >
            {isGroupAdded ? "Added to Group" : "Group Invitation"}
          </MyText>
          <MyText
            color="$textSecondary"
            style={{ fontFamily: "MPlusRounded400" }}
            fontSize={scale(13)}
          >
            {isGroupAdded
              ? `Added on: ${formatDate(notificationReceivedAt || "")} at ${formatTime(notificationReceivedAt || "")}`
              : `Received on: ${formatDate(notificationReceivedAt || "")} at ${formatTime(notificationReceivedAt || "")}`}
          </MyText>
        </YStack>
      </YStack>

      {/* Invitation Message */}
      {/* <YStack
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
          {groupDetails?.group?.description || "You have a group invitation"}
        </MyText>
      </YStack> */}

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
                  uri: groupDetails?.group?.avatar || ICONS.defaultGroup,
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
                {groupDetails?.group?.name || "Group"}
              </MyText>
              {groupDetails?.group?.description && (
                <MyText
                  color="$textSecondary"
                  style={{ fontFamily: "MPlusRounded400" }}
                  fontSize={scale(14)}
                >
                  {groupDetails?.group?.description}
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
                  groupDetails?.group?.createdBy?.profilePicture ||
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
                {groupDetails?.group?.createdBy?.name || "Unknown"}
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
              <MyText
                color="$textSecondary"
                style={{ fontFamily: "MPlusRounded400" }}
                fontSize={scale(13)}
              >
                Created on: {formatDate(groupDetails?.group?.createdAt || "")}{" "}
                at {formatTime(groupDetails?.group?.createdAt || "")}
              </MyText>
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
              Members ({groupDetails?.group?.members?.length || 0})
            </MyText>
            <XStack items="center" gap={scale(4)}>
              <Feather name="users" size={scale(14)} color="#3498db" />
              <MyText
                color="$blue11"
                style={{ fontFamily: "MPlusRounded500" }}
                fontSize={scale(12)}
              >
                {groupDetails?.group?.members?.length || 0} member
                {groupDetails?.group?.members?.length !== 1 ? "s" : ""}
              </MyText>
            </XStack>
          </XStack>

          <MyText
            color="$textPrimary"
            style={{ fontFamily: "MPlusRounded400" }}
            fontSize={scale(14)}
            lineHeight={scale(20)}
          >
            {groupDetails?.group?.members
              ?.map((member) => member.name)
              .join(", ") || ""}
          </MyText>
        </YStack>
      </YStack>

      {/* Action Button - View Group */}
      {groupDetails?.group && (
        <YStack gap={scale(16)} width="100%">
          {isGroupAdded && (
            <YStack
              bg="$green2"
              p={scale(16)}
              rounded={scale(16)}
              width="100%"
              borderWidth={1}
              borderColor="$green6"
              items="center"
              gap={scale(8)}
            >
              <XStack items="center" gap={scale(8)}>
                <Feather name="check-circle" size={scale(20)} color="#22c55e" />
                <MyText
                  color="$green11"
                  style={{ fontFamily: "MPlusRounded600" }}
                  fontSize={scale(16)}
                >
                  You've been added to this group!
                </MyText>
              </XStack>
              <MyText
                color="$green10"
                style={{ fontFamily: "MPlusRounded400", textAlign: "center" }}
                fontSize={scale(14)}
              >
                You can now start splitting expenses with the group
              </MyText>
            </YStack>
          )}

          {/* View Group Button */}
          <Button
            width="100%"
            bg="$accentYellow"
            rounded={scale(16)}
            height={scale(56)}
            pressStyle={{
              bg: "$accentYellowPressed",
              scale: 0.98,
            }}
            onPress={handleVisitGroup}
          >
            <XStack items="center" gap={scale(8)}>
              <Feather
                name="users"
                size={scale(18)}
                color={theme.textPrimary.val}
              />
              <MyText
                color="$textPrimary"
                style={{ fontFamily: "MPlusRounded700" }}
                fontSize={scale(16)}
                lineHeight={scale(20)}
              >
                View Group
              </MyText>
            </XStack>
          </Button>
        </YStack>
      )}
    </YStack>
  );
};
