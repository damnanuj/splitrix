import { useMemo, useState } from "react";
import {
  ScrollView,
  XStack,
  YStack,
  Stack,
  Avatar,
  Image,
  useTheme,
} from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { scale } from "src/utils/functions/dimensions";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import BackButtonWithHeader from "../../../components/common/BackButtonWithHeader";
import { formatDate } from "src/utils/functions/formatDate";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useGroupDetails } from "src/hooks/group/useGroupDetails";
import { ModalSheet } from "src/components/common/ModalSheet";
import { useGroupBills } from "src/hooks/billing/useGroupBills";
import { useAuthStore } from "src/stores/authStore";
import { GroupExpense } from "src/stores/types";
import ExpenseSplitItem from "src/features/billing/components/ExpenseSplitItem";

const GroupDetailsScreen = () => {
  const router = useRouter();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const theme = useTheme();
  // console.log(groupId, "-<<<<<<theme");

  const { data: group, isLoading, error } = useGroupDetails(groupId);

  // console.log(group, "-<<<<<<group");

  const {
    data: billsData,
    isLoading: billsLoading,
    error: billsError,
    refetch: refetchBills,
  } = useGroupBills(groupId);

  console.log(billsData, "-<<<<<<billsData");

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

  const {
    name,
    description,
    members,
    createdBy,
    avatar,
    createdAt,
    memberCount,
  } = group;

  return (
    <>
      <YStack bg="$background" flex={1}>
        {/* --------cover image------------ */}
        <Stack position="absolute" top={0} left={0} right={0} bottom={0}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1495837174058-628aafc7d610?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kcyUyMGdyb3VwfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
            }}
            height={scale(180)}
          />
        </Stack>

        {/* --------back button------------ */}
        <Stack px={scale(25)}>
          <BackButtonWithHeader title={name} />
        </Stack>

        <ScrollView
          showsVerticalScrollIndicator={false}
          px={scale(25)}
          contentContainerStyle={{
            height: "100%",
            flex: 1,
            // borderWidth: 1,
          }}
        >
          <YStack flex={1}>
            {/* --------group card------------ */}
            <Stack
              width={"100%"}
              mt={scale(50)}
              height={scale(250)}
              rounded={scale(30)}
              bg="$backgroundSecondary"
              elevation={4}
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={5}
            >
              <Stack
                width={scale(130)}
                height={scale(100)}
                position="absolute"
                top={scale(-50)}
                left="50%"
                // translate by half its width to keep centered over the card
                style={{ transform: [{ translateX: -scale(65) }] }}
                bg="$background"
                rounded={scale(20)}
                borderWidth={2}
                borderColor="$borderColor"
                overflow="hidden"
                elevation={4}
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={5}
              >
                <Image
                  source={{
                    uri: "https://watermark.lovepik.com/photo/40214/1190.jpg_wh1200.jpg",
                  }}
                  width={scale(130)}
                  height={scale(100)}
                  rounded={scale(20)}
                />
              </Stack>

              <YStack
                flex={1}
                mt={scale(50)}
                p={scale(10)}
                py={scale(4)}
                items="center"
              >
                <MyText
                  color="$textPrimary"
                  fontSize={scale(25)}
                  fontWeight="600"
                >
                  {name}
                </MyText>
                <MyText color="$textSecondary" fontSize={scale(13)}>
                  {description}
                </MyText>
              </YStack>
            </Stack>

            {/* --------recent bills------------ */}
            <YStack
              flex={1}
              width={"100%"}
              mt={scale(10)}
            >
              <MyText
                color="$textPrimary"
                fontSize={scale(16)}
                my={scale(10)}
                style={{ fontFamily: "MPlusRounded700" }}
              >
                Split History
              </MyText>
              {/* <Stack
                borderWidth={1}
                borderStyle="dashed"
                borderColor={"$backgroundSecondary"}
                mb={scale(10)}
              ></Stack> */}
              <ScrollView showsVerticalScrollIndicator={false}>
                {billsData?.map((splitBill, idx) => (
                  <ExpenseSplitItem key={idx} splitBill={splitBill} />
                ))}
              </ScrollView>
            </YStack>
          </YStack>
        </ScrollView>

        {/* --------new split button------------ */}
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
            onPress={() => {
              if (!groupId) return;
              router.push({
                pathname: "/createGroupExpense",
                params: { groupId },
              });
            }}
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
      </YStack>

      <ModalSheet
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
        snapPoints={[90]}
        padding="$5"
        gap="$5"
      >
        <YStack
          gap={scale(16)}
          flex={1}
          height="100%"
        >
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
            </YStack>
          </XStack>

          {description ? (
            <MyText color="$textSecondary" fontSize={scale(13)}>
              {description}
            </MyText>
          ) : null}

          <YStack
            borderWidth={1}
            borderColor="$backgroundSecondary"
            rounded={scale(12)}
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
            </YStack>
          </YStack>

          <YStack gap={scale(12)} borderColor="red" flex={1}>
            <YStack gap={scale(10)}>
              <MyText
                color="$textPrimary"
                fontSize={scale(15)}
                style={{ fontFamily: "MPlusRounded700" }}
              >
                Members ({memberCount ?? members.length})
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
                          <Avatar.Image
                            source={{ uri: member.profilePicture }}
                          />
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
        </YStack>
      </ModalSheet>
    </>
  );
};

export default GroupDetailsScreen;
