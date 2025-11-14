import React, { useMemo, useState } from "react";
import {
  ScrollView,
  XStack,
  YStack,
  Stack,
  Avatar,
  Separator,
  Image,
  useTheme,
} from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { scale } from "src/utils/functions/dimensions";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import BackButtonWithHeader from "../../../components/common/BackButtonWithHeader";
import { formatDate } from "src/utils/functions/formatDate";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGroupDetails } from "src/hooks/group/useGroupDetails";
import { ModalSheet } from "src/components/common/ModalSheet";

const mockSplitHistory = [
  {
    id: "1",
    date: "13",
    month: "Nov",
    title: "sunscreen mask",
    subtitle: "Pavan Paid ₹200",
    involvement: "Not involved",
  },
  {
    id: "2",
    date: "11",
    month: "Nov",
    title: "dinner",
    subtitle: "Pavan Paid ₹250",
    involvement: "Not involved",
  },
  {
    id: "3",
    date: "11",
    month: "Nov",
    title: "ANKIT",
    subtitle: "Khushal Paid ₹120",
    involvement: "Not involved",
  },
];

const outstandingPayment = {
  name: "Khushal Khode AL",
  amount: 324,
};

const GroupDetailsScreen = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const theme = useTheme();

  const { data: groupData, isLoading, error } = useGroupDetails(groupId);
  const group = groupData?.group;
  const members = group?.members ?? [];
  const balance = groupData?.userMembership?.balance ?? null;

  const memberSummary = useMemo(() => {
    if (!members.length) {
      return "";
    }

    if (members.length === 1) {
      return members[0].name;
    }

    if (members.length === 2) {
      return `${members[0].name} and ${members[1].name}`;
    }

    const [first, second, ...rest] = members;
    return `${first.name}, ${second.name} and ${rest.length} more`;
  }, [members]);

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

  const { name, description, createdBy, avatar, createdAt } = group;

  return (
    <>
      <YStack bg="$background" flex={1}>
        <Stack flex={1} px={scale(25)} position="relative">
          <BackButtonWithHeader title={name} />

          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <YStack
              gap={scale(24)}
              //  borderWidth={1}
              borderColor="red"
            >
              <YStack
                bg="$background"
                // p={scale(24)}
                rounded={scale(24)}
                // gap={scale(8)}
                items="center"
              >
                <Stack
                  bg="$background"
                  // borderWidth={1}
                  // borderColor="red"
                  width={scale(100)}
                  height={scale(80)}
                  rounded={scale(20)}
                  justify="center"
                  items="center"
                  shadowColor="#000"
                  shadowOpacity={0.15}
                  shadowRadius={6}
                  overflow="hidden"
                  shadowOffset={{ width: 0, height: 4 }}
                >
                  <Image
                    source={{
                      uri:
                        avatar ||
                        "https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kcyUyMGdyb3VwfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
                    }}
                    width={scale(100)}
                    height={scale(80)}
                    rounded={scale(20)}
                  />
                </Stack>

                <YStack
                  // borderWidth={1}
                  borderColor="green"
                  items="center"
                  gap={scale(5)}
                  py={scale(5)}
                >
                  <MyText
                    color="$textPrimary"
                    fontSize={scale(18)}
                    style={{
                      fontFamily: "MPlusRounded600",
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </MyText>
                  {!!memberSummary && (
                    <MyText
                      color="$textSecondary"
                      fontSize={scale(14)}
                      style={{ textAlign: "center" }}
                    >
                      {memberSummary}
                    </MyText>
                  )}
                  {description ? (
                    <MyText
                      color="$textSecondary"
                      fontSize={scale(13)}
                      style={{ textAlign: "center" }}
                    >
                      {description}
                    </MyText>
                  ) : null}
                </YStack>

                <XStack
                  width="100%"
                  justify="center"
                  // borderWidth={1}
                  borderColor="blue"
                >
                  <XStack
                    borderWidth={0.8}
                    // borderColor="yellow"
                    borderColor={"$borderPrimary"}
                    onPress={() => setProfileSheetOpen(true)}
                    // bg="$backgroundSecondary"
                    // px={scale(18)}
                    // py={scale(12)}
                    p={scale(5)}
                    px={scale(10)}
                    rounded={scale(5)}
                    gap={scale(10)}
                    items="center"
                    pressStyle={{ opacity: 0.85, scale: 0.99 }}
                    cursor="pointer"
                    shadowColor="#000"
                    shadowOpacity={0.12}
                    shadowRadius={5}
                    shadowOffset={{ width: 0, height: 3 }}
                  >
                    <MyText
                      color="$textPrimary"
                      fontSize={scale(14)}
                      style={{ fontFamily: "MPlusRounded600" }}
                    >
                      Profile
                    </MyText>
                  </XStack>
                </XStack>
              </YStack>

              <YStack gap={scale(12)}>
                <XStack gap={scale(15)} items="center" justify="center">
                  <MyText
                    color="$textPrimary"
                    fontSize={scale(15)}
                    letterSpacing={1.5}
                    style={{ fontFamily: "MPlusRounded700" }}
                  >
                    YOU NEED TO PAY
                  </MyText>
                </XStack>

                <XStack
                  // bg="$backgroundSecondary"
                  borderWidth={1}
                  borderColor="$borderColor"
                  // rounded={scale(18)}
                  rounded={scale(12)}
                  px={scale(18)}
                  py={scale(16)}
                  items="center"
                  justify="space-between"
                >
                  <XStack gap={scale(12)} items="center">
                    <Stack
                      width={scale(45)}
                      height={scale(45)}
                      rounded={scale(12)}
                      bg="$background"
                      justify="center"
                      items="center"
                      borderWidth={1}
                      borderColor="$borderColor"
                    >
                      <FontAwesome name="user" size={25} color="#7f8c8d" />
                    </Stack>

                    <YStack>
                      <MyText
                        color="$textPrimary"
                        fontSize={scale(15)}
                        style={{ fontFamily: "MPlusRounded600" }}
                      >
                        {outstandingPayment.name}
                      </MyText>
                      <MyText
                        color="#ff6b6b"
                        fontSize={scale(18)}
                        style={{ fontFamily: "MPlusRounded700" }}
                      >
                        ₹{outstandingPayment.amount}
                      </MyText>
                    </YStack>
                  </XStack>

                  <XStack
                    onPress={() => {}}
                    bg="$accentYellow"
                    px={scale(18)}
                    py={scale(10)}
                    rounded={scale(5)}
                    items="center"
                    pressStyle={{ opacity: 0.9 }}
                    cursor="pointer"
                  >
                    <MyText
                      color="#fff"
                      fontSize={scale(14)}
                      style={{ fontFamily: "MPlusRounded600" }}
                    >
                      Pay Now
                    </MyText>
                  </XStack>
                </XStack>
              </YStack>

              <YStack gap={scale(16)}>
                <XStack justify="space-between" items="center">
                  <YStack>
                    <MyText
                      color="$textPrimary"
                      fontSize={scale(16)}
                      style={{ fontFamily: "MPlusRounded700" }}
                    >
                      Split History
                    </MyText>
                    <MyText
                      color="$textSecondary"
                      fontSize={scale(13)}
                      style={{ fontFamily: "MPlusRounded500" }}
                    >
                      All expenses & Payments
                    </MyText>
                  </YStack>

                  <XStack
                    bg="$backgroundSecondary"
                    px={scale(14)}
                    py={scale(8)}
                    rounded={scale(16)}
                    gap={scale(8)}
                    items="center"
                  >
                    <MyText color="$textPrimary" fontSize={scale(12)}>
                      All
                    </MyText>
                    <FontAwesome
                      name="chevron-down"
                      size={10}
                      color="#7f8c8d"
                    />
                  </XStack>
                </XStack>

                <YStack gap={scale(14)}>
                  {mockSplitHistory.map((item) => (
                    <XStack key={item.id} gap={scale(14)} items="center">
                      <YStack
                        width={scale(58)}
                        height={scale(70)}
                        bg="$backgroundSecondary"
                        rounded={scale(16)}
                        justify="center"
                        items="center"
                        gap={scale(2)}
                      >
                        <MyText
                          color="$textPrimary"
                          fontSize={scale(20)}
                          style={{ fontFamily: "MPlusRounded700" }}
                        >
                          {item.date}
                        </MyText>
                        <MyText
                          color="$textSecondary"
                          fontSize={scale(12)}
                          style={{ fontFamily: "MPlusRounded500" }}
                        >
                          {item.month}
                        </MyText>
                      </YStack>

                      <YStack
                        flex={1}
                        bg="$backgroundSecondary"
                        rounded={scale(18)}
                        px={scale(18)}
                        py={scale(14)}
                        gap={scale(6)}
                      >
                        <XStack justify="space-between" items="center">
                          <MyText
                            color="$textPrimary"
                            fontSize={scale(15)}
                            style={{ fontFamily: "MPlusRounded600" }}
                          >
                            {item.title}
                          </MyText>
                          <MyText
                            color="$textSecondary"
                            fontSize={scale(12)}
                            style={{ fontFamily: "MPlusRounded500" }}
                          >
                            {item.involvement}
                          </MyText>
                        </XStack>
                        <MyText
                          color="$textSecondary"
                          fontSize={scale(12)}
                          style={{ fontFamily: "MPlusRounded500" }}
                        >
                          {item.subtitle}
                        </MyText>
                      </YStack>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            </YStack>
          </ScrollView>

          <Stack
            position="absolute"
            style={{ bottom: scale(30), right: scale(25) }}
          >
            <XStack
              bg="$accentYellow"
              px={scale(25)}
              py={scale(15)}
              rounded={scale(10)}
              items="center"
              gap={scale(10)}
              shadowColor="#000"
              shadowOpacity={0.2}
              shadowRadius={8}
              shadowOffset={{ width: 0, height: 6 }}
              cursor="pointer"
              onPress={() => {}}
            >
              <FontAwesome
                name="plus"
                size={scale(14)}
                color={theme.textPrimary.val}
              />

              <MyText
                color={"$textPrimary"}
                fontSize={scale(14)}
                style={{ fontFamily: "MPlusRounded700" }}
              >
                New Split
              </MyText>
            </XStack>
          </Stack>
        </Stack>
      </YStack>

      <ModalSheet
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
        snapPoints={[70]}
        padding="$5"
        gap="$5"
      >
        <YStack gap={scale(16)}>
          <XStack gap={scale(12)} items="center">
            <Stack
              bg="$backgroundSecondary"
              width={scale(56)}
              height={scale(56)}
              rounded={scale(28)}
              justify="center"
              items="center"
            >
              {avatar ? (
                <Avatar circular size="$5">
                  <Avatar.Image source={{ uri: avatar }} />
                  <Avatar.Fallback bg="$backgroundSecondary">
                    <FontAwesome name="group" size={24} color="#f1c40f" />
                  </Avatar.Fallback>
                </Avatar>
              ) : (
                <FontAwesome name="group" size={24} color="#f1c40f" />
              )}
            </Stack>

            <YStack gap={scale(4)}>
              <MyText
                color="$textPrimary"
                fontSize={scale(18)}
                style={{ fontFamily: "MPlusRounded700" }}
              >
                {name}
              </MyText>
              {!!memberSummary && (
                <MyText color="$textSecondary" fontSize={scale(13)}>
                  {memberSummary}
                </MyText>
              )}
            </YStack>
          </XStack>

          {description ? (
            <MyText color="$textSecondary" fontSize={scale(13)}>
              {description}
            </MyText>
          ) : null}

          <YStack
            bg="$backgroundSecondary"
            rounded={scale(18)}
            px={scale(16)}
            py={scale(16)}
            gap={scale(12)}
          >
            <MyText
              color="$textPrimary"
              fontSize={scale(15)}
              style={{ fontFamily: "MPlusRounded700" }}
            >
              Group Information
            </MyText>

            <YStack gap={scale(10)}>
              <XStack justify="space-between">
                <MyText color="$textSecondary" fontSize={scale(13)}>
                  Created by
                </MyText>
                <MyText color="$textPrimary" fontSize={scale(13)}>
                  {createdBy.name}
                </MyText>
              </XStack>
              <XStack justify="space-between">
                <MyText color="$textSecondary" fontSize={scale(13)}>
                  Created on
                </MyText>
                <MyText color="$textPrimary" fontSize={scale(13)}>
                  {formatDate(createdAt)}
                </MyText>
              </XStack>
              <XStack justify="space-between">
                <MyText color="$textSecondary" fontSize={scale(13)}>
                  Members
                </MyText>
                <MyText color="$textPrimary" fontSize={scale(13)}>
                  {members.length}
                </MyText>
              </XStack>

              {balance && (
                <XStack justify="space-between">
                  <MyText color="$textSecondary" fontSize={scale(13)}>
                    Your balance
                  </MyText>
                  <MyText
                    color={
                      balance.amountOwed > 0
                        ? "#ff6b6b"
                        : balance.amountToReceive > 0
                        ? "green"
                        : "$textPrimary"
                    }
                    fontSize={scale(13)}
                  >
                    {balance.amountOwed > 0
                      ? `Owe ₹${balance.amountOwed}`
                      : balance.amountToReceive > 0
                      ? `Receive ₹${balance.amountToReceive}`
                      : "All settled up"}
                  </MyText>
                </XStack>
              )}
            </YStack>
          </YStack>

          <Separator bg="$backgroundSecondary" />

          <YStack gap={scale(12)}>
            <MyText
              color="$textPrimary"
              fontSize={scale(15)}
              style={{ fontFamily: "MPlusRounded700" }}
            >
              Members ({members.length})
            </MyText>

            <YStack gap={scale(10)}>
              {members.map((member) => (
                <XStack
                  key={member._id}
                  bg="$backgroundSecondary"
                  rounded={scale(14)}
                  px={scale(14)}
                  py={scale(12)}
                  gap={scale(12)}
                  items="center"
                >
                  <Stack
                    bg="$background"
                    width={scale(40)}
                    height={scale(40)}
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

                  <YStack flex={1} gap={scale(2)}>
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
                      bg="#5a31f4"
                      px={scale(8)}
                      py={scale(4)}
                      rounded={scale(10)}
                    >
                      <MyText color="#fff" fontSize={scale(10)}>
                        Admin
                      </MyText>
                    </Stack>
                  )}
                </XStack>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ModalSheet>
    </>
  );
};

export default GroupDetailsScreen;
