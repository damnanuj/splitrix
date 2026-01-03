import { useMemo, useState } from "react";
import {
  ScrollView,
  XStack,
  YStack,
  Stack,
  Avatar,
  Image,
  useTheme,
  Button,
  Spinner,
} from "tamagui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { scale } from "src/utils/functions/dimensions";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import BackButtonWithHeader from "../../../components/common/BackButtonWithHeader";
import { formatDate } from "src/utils/functions/formatDate";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  useGroupBalanceSummary,
  useGroupDetails,
} from "src/hooks/group/useGroupDetails";
import { ModalSheet } from "src/components/common/ModalSheet";
import { useGroupBills } from "src/hooks/billing/useGroupBills";
import { useAuthStore } from "src/stores/authStore";
import { GroupExpense } from "src/stores/types";
import ExpenseSplitItem from "src/features/billing/components/ExpenseSplitItem";
import { RefreshControl } from "react-native";
import MemberSelector from "src/components/common/MemberSelector";
import { useAddGroupMembers } from "src/hooks/group/useAddGroupMembers";
import { useToastController } from "@tamagui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { getGroupById } from "src/services/group.service";

export const formatAmount = (amount: number) =>
  `₹${Math.abs(amount).toFixed(2)}`;

const GroupDetailsScreen = () => {
  const router = useRouter();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const theme = useTheme();
  const toast = useToastController();
  const addMembersMutation = useAddGroupMembers(groupId || "");
  const queryClient = useQueryClient();
  // console.log(groupId, "-<<<<<<theme");

  const {
    data: group,
    isLoading,
    error,
    refetch: refetchGroup,
  } = useGroupDetails(groupId);

  // console.log(group, "-<<<<<<group");

  const {
    data: billsData,
    isLoading: billsLoading,
    error: billsError,
    refetch: refetchBills,
  } = useGroupBills(groupId);

  // console.log(billsData, "-<<<<<<billsData");

  const {
    data: balanceSummaryData,
    isLoading: balanceSummaryLoading,
    error: balanceSummaryError,
    refetch: refetchBalanceSummary,
  } = useGroupBalanceSummary(groupId);

  // console.log(balanceSummaryData, "-<<<<<<balanceSummaryData");

  const { amountsToPay, amountsToReceive } = useMemo(() => {
    const toPay = (balanceSummaryData || []).filter((item) => item.amount < 0);
    const toReceive = (balanceSummaryData || []).filter(
      (item) => item.amount > 0
    );
    return { amountsToPay: toPay, amountsToReceive: toReceive };
  }, [balanceSummaryData]);

  const isSettled =
    !balanceSummaryLoading &&
    amountsToPay.length === 0 &&
    amountsToReceive.length === 0;

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
        <Stack
          position="absolute"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
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
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                refetchGroup();
                refetchBills();
                refetchBalanceSummary();
              }}
              tintColor="#FFD700"
              colors={["#FFD700"]}
            />
          }
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
              mt={scale(75)}
              style={{ elevation: 4 }}
              rounded={scale(30)}
              bg="$backgroundSecondary"
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={5}
              // borderWidth={1}
              borderColor="red"
              // overflow="hidden"/
              p={scale(20)}
            >
              {/*--------------image stack-------- */}
              <Stack
                width={scale(130)}
                height={scale(100)}
                position="absolute"
                z={99999}
                // translate by half its width to keep centered over the card
                style={{
                  top: scale(-50),
                  left: "50%",
                  transform: [{ translateX: -scale(45) }],
                  elevation: 4,
                }}
                bg="$background"
                rounded={scale(20)}
                borderWidth={2}
                borderColor="$borderColor"
                overflow="hidden"
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={5}
                items="center"
                justify="center"
              >
                {avatar && avatar.trim().length > 0 ? (
                  <Image
                    source={{ uri: avatar }}
                    width={scale(130)}
                    height={scale(100)}
                    rounded={scale(20)}
                  />
                ) : (
                  <FontAwesome
                    name="group"
                    size={scale(55)}
                    color={theme.accentYellow.val}
                  />
                )}
              </Stack>

              <YStack
                // flex={1}
                mt={scale(40)}
                // borderWidth={1}
                borderColor="blue"
                items="center"
                rounded={scale(20)}
              >
                <MyText
                  color="$textPrimary"
                  fontSize={scale(25)}
                  fontWeight="600"
                >
                  {name}
                </MyText>
                <MyText
                  color="$textSecondary"
                  fontSize={scale(13)}
                  mb={scale(15)}
                >
                  {description}
                </MyText>

                {/* Invite / Add Members & Group Profile Buttons */}
                <XStack items="center" gap={scale(10)} mb={scale(10)}>
                  <Button
                    onPress={() => setInviteSheetOpen(true)}
                    bg="$accentYellow"
                    color="$accentBlack"
                    fontSize={scale(14)}
                    fontWeight="600"
                    height={scale(40)}
                    rounded={scale(10)}
                    pressStyle={{ opacity: 0.85 }}
                  >
                    <XStack items="center" gap={scale(8)}>
                      <FontAwesome
                        name="user-plus"
                        size={scale(14)}
                        color={theme.textPrimary.val}
                      />
                      <MyText
                        color="$textPrimary"
                        fontSize={scale(14)}
                        style={{ fontFamily: "MPlusRounded700" }}
                      >
                        Add Members
                      </MyText>
                    </XStack>
                  </Button>

                  <Button
                    onPress={() => setProfileSheetOpen(true)}
                    bg="$backgroundSecondary"
                    height={scale(40)}
                    width={scale(40)}
                    rounded={scale(20)}
                    p={0}
                    pressStyle={{ opacity: 0.85 }}
                  >
                    <XStack flex={1} items="center" justify="center">
                      <FontAwesome
                        name="user-circle"
                        size={scale(20)}
                        color={theme.textPrimary.val}
                      />
                    </XStack>
                  </Button>
                </XStack>

                <YStack
                  width="100%"
                  // mt={scale(12)}
                  gap={scale(10)}
                  // borderWidth={1}
                  borderColor="$borderPrimary"
                >
                  {isSettled ? (
                    <YStack
                      width="100%"
                      items="center"
                      gap={scale(8)}
                      py={scale(16)}
                    >
                      <FontAwesome
                        name="check-circle"
                        size={scale(26)}
                        color={theme.accentGreen?.val || theme.textPrimary.val}
                      />
                      <MyText
                        color="$textPrimary"
                        fontSize={scale(16)}
                        style={{ fontFamily: "MPlusRounded700" }}
                      >
                        You&apos;re all settled!
                      </MyText>
                      <MyText color="$textSecondary" fontSize={scale(13)}>
                        You do not have any due amount.
                      </MyText>
                    </YStack>
                  ) : (
                    <>
                      {/* ------------you need to pay------------ */}
                      {balanceSummaryLoading || amountsToPay.length > 0 ? (
                        <YStack
                          gap={scale(6)}
                          width="100%"
                          // borderWidth={1}
                          borderColor="$borderPrimary"
                        >
                          <MyText
                            color="$textPrimary"
                            fontSize={scale(14)}
                            style={{
                              fontFamily: "MPlusRounded600",
                              letterSpacing: scale(3),
                            }}
                          >
                            YOU NEED TO PAY
                          </MyText>
                          {balanceSummaryLoading ? (
                            <MyText color="$textSecondary" fontSize={scale(12)}>
                              Loading summary...
                            </MyText>
                          ) : (
                            amountsToPay.map((item) => (
                              <XStack
                                key={item.memberId}
                                justify="space-between"
                                width="100%"
                                items="center"
                                gap={scale(10)}
                                // borderWidth={1}
                                borderColor="$borderPrimary"
                                // p={scale(10)}
                                py={scale(10)}
                                rounded={scale(10)}
                              >
                                <XStack items="center" gap={scale(8)}>
                                  <Avatar circular size={scale(40)}>
                                    <Avatar.Image
                                      accessibilityLabel={item.name}
                                      src={item.profilePicture}
                                    />
                                    <Avatar.Fallback delayMs={300}>
                                      <MyText
                                        color="$textPrimary"
                                        fontSize={scale(13)}
                                      >
                                        {item.name?.[0] || "?"}
                                      </MyText>
                                    </Avatar.Fallback>
                                  </Avatar>
                                  <MyText
                                    color="$textPrimary"
                                    fontSize={scale(14)}
                                  >
                                    {item.name}
                                  </MyText>
                                </XStack>
                                <MyText color="$accentRed" fontSize={scale(14)}>
                                  {formatAmount(item.amount)}
                                </MyText>
                              </XStack>
                            ))
                          )}
                        </YStack>
                      ) : null}

                      {/* ------------you will get back------------ */}
                      {balanceSummaryLoading || amountsToReceive.length > 0 ? (
                        <YStack gap={scale(6)} width="100%">
                          <MyText
                            color="$textPrimary"
                            fontSize={scale(14)}
                            style={{
                              fontFamily: "MPlusRounded600",
                              letterSpacing: scale(3),
                            }}
                          >
                            YOU WILL GET BACK
                          </MyText>
                          {balanceSummaryLoading ? (
                            <MyText color="$textSecondary" fontSize={scale(12)}>
                              Loading summary...
                            </MyText>
                          ) : (
                            amountsToReceive.map((item) => (
                              <XStack
                                key={item.memberId}
                                justify="space-between"
                                width="100%"
                                items="center"
                                gap={scale(10)}
                              >
                                <XStack items="center" gap={scale(8)}>
                                  <Avatar circular size={scale(40)}>
                                    <Avatar.Image
                                      accessibilityLabel={item.name}
                                      src={item.profilePicture}
                                    />
                                    <Avatar.Fallback delayMs={300}>
                                      <MyText
                                        color="$textPrimary"
                                        fontSize={scale(13)}
                                      >
                                        {item.name?.[0] || "?"}
                                      </MyText>
                                    </Avatar.Fallback>
                                  </Avatar>
                                  <MyText
                                    color="$textPrimary"
                                    fontSize={scale(14)}
                                  >
                                    {item.name}
                                  </MyText>
                                </XStack>
                                <MyText
                                  color="$accentGreen"
                                  fontSize={scale(14)}
                                >
                                  {formatAmount(item.amount)}
                                </MyText>
                              </XStack>
                            ))
                          )}
                        </YStack>
                      ) : null}
                    </>
                  )}
                </YStack>
              </YStack>
            </Stack>

            {/* --------recent bills------------ */}
            <YStack
              z={99999}
              flex={1}
              // borderWidth={1}
              borderColor="$borderPrimary"
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={billsLoading}
                //     onRefresh={() => {
                //       refetchGroup();
                //       refetchBills();
                //       refetchBalanceSummary();
                //     }}
                //     tintColor="#FFD700"
                //     colors={["#FFD700"]}
                //   />
                // }
              >
                {billsData && billsData.length > 0 ? (
                  billsData.map((splitBill, idx) => (
                    <ExpenseSplitItem
                      key={splitBill.id || idx}
                      splitBill={splitBill}
                    />
                  ))
                ) : !billsLoading ? (
                  <YStack
                    flex={1}
                    py={scale(20)}
                    items="center"
                    justify="center"
                    gap={scale(6)}
                  >
                    <FontAwesome
                      name="file-o"
                      size={scale(22)}
                      color={theme.textSecondary.val}
                    />
                    <MyText
                      color="$textPrimary"
                      fontSize={scale(14)}
                      style={{ fontFamily: "MPlusRounded700" }}
                    >
                      No expenses yet
                    </MyText>
                    <MyText color="$textSecondary" fontSize={scale(12)}>
                      Start by adding your first split for this group.
                    </MyText>
                  </YStack>
                ) : null}
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

              // Prefetch in background (non-blocking) to ensure data is ready
              queryClient
                .prefetchQuery({
                  queryKey: ["group", "details", groupId],
                  queryFn: async () => {
                    const res = await getGroupById(groupId);
                    if (res.success) return res.data;
                    throw new Error(res.msg || "Failed to fetch group details");
                  },
                  staleTime: 1000 * 60 * 1,
                })
                .catch(() => {
                  // Silently handle prefetch errors - navigation will still work
                });

              // Navigate immediately - React Query will use cached data if available
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

      {/* Invite Members Sheet */}
      <ModalSheet
        open={inviteSheetOpen}
        onOpenChange={setInviteSheetOpen}
        snapPoints={[30]}
      >
        <YStack gap={scale(16)} flex={1}>
          <YStack gap={scale(6)}>
            <MyText color="$textPrimary" fontSize={scale(18)} fontWeight="600">
              Add Members to Group
            </MyText>
            <MyText color="$textSecondary" fontSize={scale(13)}>
              Select friends to add to this group.
            </MyText>
          </YStack>

          <MemberSelector
            selectedMemberIds={selectedMemberIds}
            onSelectionChange={setSelectedMemberIds}
            excludeMemberIds={members.map((m) => m._id)}
            helperText={(count) =>
              `${count} friend${count !== 1 ? "s" : ""} selected to add`
            }
          />

          <Button
            onPress={async () => {
              if (selectedMemberIds.length === 0) {
                toast.show("No members selected", {
                  message: "Please select at least one friend to add.",
                });
                return;
              }

              try {
                const response = await addMembersMutation.mutateAsync(
                  selectedMemberIds
                );

                toast.show("Members added", {
                  message:
                    response?.message ||
                    `Successfully added ${selectedMemberIds.length} friend${
                      selectedMemberIds.length !== 1 ? "s" : ""
                    } to the group.`,
                });

                setSelectedMemberIds([]);
                setInviteSheetOpen(false);
                refetchGroup(); // Refresh group details
              } catch (error) {
                const errorMessage =
                  error instanceof Error
                    ? error.message
                    : "Failed to add members to group";
                toast.show("Failed to add members", {
                  message: errorMessage,
                });
              }
            }}
            bg="$accentYellow"
            color="$accentBlack"
            fontSize={scale(16)}
            fontWeight="600"
            height={scale(52)}
            rounded={scale(12)}
            disabled={
              selectedMemberIds.length === 0 || addMembersMutation.isPending
            }
            opacity={
              selectedMemberIds.length === 0 || addMembersMutation.isPending
                ? 0.6
                : 1
            }
            pressStyle={{ opacity: 0.85 }}
          >
            {addMembersMutation.isPending ? (
              <XStack items="center" gap={scale(10)}>
                <Spinner size="small" color="$accentBlack" />
                <MyText
                  color="$accentBlack"
                  fontSize={scale(16)}
                  fontWeight="600"
                >
                  Sending...
                </MyText>
              </XStack>
            ) : (
              <MyText
                color="$accentBlack"
                fontSize={scale(16)}
                fontWeight="600"
              >
                Add Members
              </MyText>
            )}
          </Button>
        </YStack>
      </ModalSheet>

      {/* Group Profile Sheet */}
      <ModalSheet
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
        snapPoints={[70]}
      >
        <YStack gap={scale(16)} flex={1}>
          {/* <YStack gap={scale(6)} items="center">
            <MyText color="$textPrimary" fontSize={scale(18)} fontWeight="600">
              Group Info
            </MyText>
            <MyText color="$textSecondary" fontSize={scale(13)}>
              View details about this group.
            </MyText>
          </YStack> */}

          <YStack gap={scale(14)} items="center">
            <Stack
              width={scale(120)}
              height={scale(90)}
              bg="$background"
              rounded={scale(24)}
              borderWidth={2}
              borderColor="$borderColor"
              overflow="hidden"
              items="center"
              justify="center"
            >
              {avatar && avatar.trim().length > 0 ? (
                <Image
                  source={{ uri: avatar }}
                  width={scale(120)}
                  height={scale(90)}
                  rounded={scale(24)}
                />
              ) : (
                <FontAwesome
                  name="group"
                  size={scale(50)}
                  color={theme.accentYellow.val}
                />
              )}
            </Stack>

            <YStack items="center" gap={scale(4)}>
              <MyText
                color="$textPrimary"
                fontSize={scale(18)}
                fontWeight="600"
              >
                {name}
              </MyText>
              <MyText color="$textSecondary" fontSize={scale(13)}>
                {memberCount ?? members.length} total member
                {(memberCount ?? members.length) === 1 ? "" : "s"} in this group
              </MyText>
            </YStack>
          </YStack>

          {/* Members List */}
          <YStack gap={scale(10)} flex={1} width="100%">
            <MyText
              color="$textPrimary"
              fontSize={scale(14)}
              style={{
                fontFamily: "MPlusRounded600",
                letterSpacing: scale(2),
              }}
            >
              MEMBERS
            </MyText>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: scale(300) }}
            >
              <YStack gap={scale(8)}>
                {members && members.length > 0 ? (
                  members.map((member) => (
                    <XStack
                      key={member._id}
                      items="center"
                      gap={scale(12)}
                      py={scale(10)}
                      px={scale(12)}
                      rounded={scale(10)}
                      bg="$backgroundSecondary"
                    >
                      <Avatar circular size={scale(45)}>
                        <Avatar.Image
                          accessibilityLabel={member.name}
                          src={member.profilePicture}
                        />
                        <Avatar.Fallback delayMs={300}>
                          <MyText
                            color="$textPrimary"
                            fontSize={scale(16)}
                            fontWeight="600"
                          >
                            {member.name?.[0]?.toUpperCase() || "?"}
                          </MyText>
                        </Avatar.Fallback>
                      </Avatar>
                      <MyText
                        color="$textPrimary"
                        fontSize={scale(15)}
                        fontWeight="500"
                      >
                        {member.name}
                      </MyText>
                    </XStack>
                  ))
                ) : (
                  <YStack
                    py={scale(20)}
                    items="center"
                    justify="center"
                    gap={scale(6)}
                  >
                    <FontAwesome
                      name="users"
                      size={scale(22)}
                      color={theme.textSecondary.val}
                    />
                    <MyText color="$textSecondary" fontSize={scale(13)}>
                      No members found
                    </MyText>
                  </YStack>
                )}
              </YStack>
            </ScrollView>
          </YStack>
        </YStack>
      </ModalSheet>
    </>
  );
};

export default GroupDetailsScreen;
