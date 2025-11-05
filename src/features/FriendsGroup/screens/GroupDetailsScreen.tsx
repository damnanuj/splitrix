import React from "react";
import { ScrollView, XStack, YStack, Stack, Square, Avatar } from "tamagui";
import { useLocalSearchParams, router } from "expo-router";
import { scale } from "src/utils/functions/dimensions";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import BackButtonWithHeader from "../../../components/common/BackButtonWithHeader";
import { Group } from "src/stores/types";
import { formatDate } from "src/utils/functions/formatDate";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGroups } from "src/hooks/group/useGroups";
import { useGroupDetails } from "src/hooks/group/useGroupDetails";

const GroupDetailsScreen = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  const { data: group, isLoading, error } = useGroupDetails(groupId);
  if (isLoading) {
    return (
      <YStack flex={1} bg="$background" justify="center" items="center">
        <MyText color="$textSecondary" fontSize={scale(16)}>
          Loading group details...
        </MyText>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack
        flex={1}
        bg="$background"
        justify="center"
        items="center"
        gap={scale(10)}
      >
        <MyText color="$red10" fontSize={scale(16)}>
          Failed to load group
        </MyText>
        <MyText color="$textSecondary" fontSize={scale(14)}>
          {error.message}
        </MyText>
      </YStack>
    );
  }

  if (!group) {
    return (
      <YStack flex={1} bg="$background" justify="center" items="center">
        <MyText color="$textPrimary" fontSize={scale(16)}>
          Group not found
        </MyText>
      </YStack>
    );
  }

  const { name, description, createdBy, members, avatar, createdAt, balance } =
    group;

  return (
    <YStack bg="$background" flex={1} px={scale(25)} gap={scale(20)}>
      <BackButtonWithHeader title={name} />

      <ScrollView flex={1} showsVerticalScrollIndicator={false} pb={scale(80)}>
        <YStack gap={scale(20)}>
          {/* Group Header */}
          <YStack
            bg="$backgroundSecondary"
            p={scale(20)}
            rounded={scale(15)}
            gap={scale(15)}
            items="center"
          >
            <Stack
              bg="$background"
              width={80}
              height={80}
              rounded={scale(40)}
              justify="center"
              items="center"
            >
              {avatar ? (
                <Avatar circular size="$6">
                  <Avatar.Image source={{ uri: avatar }} />
                  <Avatar.Fallback bg="$backgroundSecondary">
                    <FontAwesome name="group" size={30} color="#f1c40f" />
                  </Avatar.Fallback>
                </Avatar>
              ) : (
                <FontAwesome name="group" size={30} color="#f1c40f" />
              )}
            </Stack>

            <YStack items="center" gap={scale(5)}>
              <MyText
                color="$textPrimary"
                fontSize={scale(20)}
                style={{ fontFamily: "MPlusRounded700", textAlign: "center" }}
              >
                {name}
              </MyText>

              {description && (
                <MyText
                  color="$textSecondary"
                  fontSize={scale(14)}
                  style={{ textAlign: "center" }}
                >
                  {description}
                </MyText>
              )}
            </YStack>

            {/* Balance Information */}
            <YStack
              bg="$background"
              p={scale(15)}
              rounded={scale(10)}
              width="100%"
              items="center"
            >
              <MyText
                color="$textSecondary"
                fontSize={scale(12)}
                style={{ fontFamily: "MPlusRounded500" }}
              >
                Your Balance
              </MyText>
              <MyText
                color={
                  balance.amountOwed > 0
                    ? "tomato"
                    : balance.amountToReceive > 0
                    ? "green"
                    : "$textPrimary"
                }
                fontSize={scale(18)}
                style={{ fontFamily: "MPlusRounded700" }}
              >
                {balance.amountOwed > 0
                  ? `You owe Rs. ${balance.amountOwed}`
                  : balance.amountToReceive > 0
                  ? `You are owed Rs. ${balance.amountToReceive}`
                  : "All settled up"}
              </MyText>
            </YStack>
          </YStack>

          {/* Group Information */}
          <YStack gap={scale(15)}>
            <MyText
              color="$textPrimary"
              fontSize={scale(16)}
              style={{ fontFamily: "MPlusRounded700" }}
            >
              Group Information
            </MyText>

            <YStack
              bg="$backgroundSecondary"
              p={scale(15)}
              rounded={scale(10)}
              gap={scale(10)}
            >
              <XStack justify="space-between" items="center">
                <MyText color="$textSecondary" fontSize={scale(14)}>
                  Created by
                </MyText>
                <MyText color="$textPrimary" fontSize={scale(14)}>
                  {createdBy.name}
                </MyText>
              </XStack>

              <XStack justify="space-between" items="center">
                <MyText color="$textSecondary" fontSize={scale(14)}>
                  Created on
                </MyText>
                <MyText color="$textPrimary" fontSize={scale(14)}>
                  {formatDate(createdAt)}
                </MyText>
              </XStack>

              <XStack justify="space-between" items="center">
                <MyText color="$textSecondary" fontSize={scale(14)}>
                  Members
                </MyText>
                <MyText color="$textPrimary" fontSize={scale(14)}>
                  {members.length}
                </MyText>
              </XStack>
            </YStack>
          </YStack>

          {/* Members List */}
          <YStack gap={scale(15)}>
            <MyText
              color="$textPrimary"
              fontSize={scale(16)}
              style={{ fontFamily: "MPlusRounded700" }}
            >
              Members ({members.length})
            </MyText>

            <YStack gap={scale(10)}>
              {members.map((member, index) => (
                <XStack
                  key={member._id}
                  bg="$backgroundSecondary"
                  p={scale(15)}
                  rounded={scale(10)}
                  items="center"
                  gap={scale(15)}
                >
                  <Stack
                    bg="$background"
                    width={40}
                    height={40}
                    rounded={scale(20)}
                    justify="center"
                    items="center"
                  >
                    {member.profilePicture ? (
                      <Avatar circular size="$3">
                        <Avatar.Image source={{ uri: member.profilePicture }} />
                        <Avatar.Fallback bg="$backgroundSecondary">
                          <FontAwesome name="user" size={16} color="#666" />
                        </Avatar.Fallback>
                      </Avatar>
                    ) : (
                      <FontAwesome name="user" size={16} color="#666" />
                    )}
                  </Stack>

                  <YStack flex={1}>
                    <MyText
                      color="$textPrimary"
                      fontSize={scale(14)}
                      style={{ fontFamily: "MPlusRounded600" }}
                    >
                      {member.name}
                    </MyText>
                    <MyText color="$textSecondary" fontSize={scale(12)}>
                      {member.email}
                    </MyText>
                  </YStack>

                  {member._id === createdBy._id && (
                    <Stack
                      bg="$blue10"
                      px={scale(8)}
                      py={scale(4)}
                      rounded={scale(12)}
                    >
                      <MyText
                        color="white"
                        fontSize={scale(10)}
                        style={{ fontFamily: "MPlusRounded600" }}
                      >
                        Admin
                      </MyText>
                    </Stack>
                  )}
                </XStack>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default GroupDetailsScreen;
