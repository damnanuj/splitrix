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

const GroupDetailsScreen = () => {
  const router = useRouter();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const theme = useTheme();

  const { data: groupData, isLoading, error } = useGroupDetails(groupId);
  const group = groupData?.group;
  const members = group?.members ?? [];
  const balance = groupData?.userMembership?.balance ?? null;
  const {
    data: billsData,
    isLoading: billsLoading,
    error: billsError,
    refetch: refetchBills,
  } = useGroupBills(groupId);
  const expenses = billsData?.expenses ?? [];
  const billMembers = billsData?.members ?? {};
  const currentUser = useAuthStore((state) => state.authData);

  console.log(groupData, "-<<<<<<groupData");

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

  const balanceSummary = useMemo(() => {
    if (balance?.amountOwed && balance.amountOwed > 0) {
      return {
        label: "You owe the group",
        amount: balance.amountOwed,
        accent: "#ff6b6b",
        actionLabel: "Settle Up",
      };
    }

    if (balance?.amountToReceive && balance.amountToReceive > 0) {
      return {
        label: "Group owes you",
        amount: balance.amountToReceive,
        accent: "#22c55e",
        actionLabel: "Add Payment",
      };
    }

    return {
      label: "All settled up",
      amount: 0,
      accent: "#7f8c8d",
      actionLabel: undefined,
    };
  }, [balance]);

  const formatCurrency = (amount: number) =>
    `₹${Number(amount ?? 0).toLocaleString("en-IN")}`;

  const getDateParts = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: `${date.getDate()}`.padStart(2, "0"),
      month: date.toLocaleString("default", { month: "short" }),
    };
  };

  const getUserInvolvement = (expense: GroupExpense) => {
    if (!currentUser) {
      return {
        label: `${expense.splits.length} participants`,
        amount: undefined,
        color: "#7f8c8d",
      };
    }

    const share = expense.splits.find(
      (split) => split.user.id === currentUser._id
    );

    if (expense.payerId === currentUser._id) {
      if (share?.balance && share.balance > 0) {
        return {
          label: "You get back",
          amount: share.balance,
          color: "#22c55e",
        };
      }

      return {
        label: "You paid",
        amount: expense.amount,
        color: "#22c55e",
      };
    }

    if (!share) {
      return {
        label: expense.yourStake?.displayMsg || "Not involved",
        amount: undefined,
        color: "#7f8c8d",
      };
    }

    if (share.balance < 0) {
      return {
        label: "Your share",
        amount: share.share,
        color: "#ef4444",
      };
    }

    if (share.balance > 0) {
      return {
        label: "You get back",
        amount: share.balance,
        color: "#22c55e",
      };
    }

    return {
      label: "Settled",
      amount: share.share,
      color: "#7f8c8d",
    };
  };

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

  const { name, description, createdBy, avatar, createdAt, memberCount } =
    group;

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
                    GROUP BALANCE
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
                        {balanceSummary.label}
                      </MyText>
                      <MyText
                        color="$textPrimary"
                        fontSize={scale(18)}
                        style={{
                          fontFamily: "MPlusRounded700",
                          color: balanceSummary.accent,
                        }}
                      >
                        {formatCurrency(balanceSummary.amount)}
                      </MyText>
                    </YStack>
                  </XStack>

                  {balanceSummary.actionLabel ? (
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
                        {balanceSummary.actionLabel}
                      </MyText>
                    </XStack>
                  ) : null}
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
                    // bg="$backgroundSecondary"
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
                  {billsLoading ? (
                    <YStack items="center" justify="center" py={scale(20)}>
                      <MyText color="$textSecondary" fontSize={scale(14)}>
                        Loading expenses...
                      </MyText>
                    </YStack>
                  ) : billsError ? (
                    <YStack gap={scale(8)} py={scale(20)} items="center">
                      <MyText color="$red10" fontSize={scale(14)}>
                        Failed to load expenses
                      </MyText>
                      <XStack
                        onPress={() => refetchBills()}
                        px={scale(14)}
                        py={scale(8)}
                        bg="$backgroundSecondary"
                        rounded={scale(10)}
                        cursor="pointer"
                      >
                        <MyText color="$textPrimary" fontSize={scale(13)}>
                          Try Again
                        </MyText>
                      </XStack>
                    </YStack>
                  ) : expenses.length === 0 ? (
                    <YStack py={scale(20)} items="center">
                      <MyText color="$textSecondary" fontSize={scale(13)}>
                        No expenses have been added to this group yet.
                      </MyText>
                    </YStack>
                  ) : (
                    expenses.map((expense) => {
                      const { day, month } = getDateParts(expense.date);
                      const payer = billMembers[expense.payerId];
                      const payerName =
                        expense.payerId === currentUser?._id
                          ? "You"
                          : payer?.name || "Someone";
                      const involvement = getUserInvolvement(expense);
                      return (
                        <XStack
                          // borderWidth={1}
                          borderColor="red"
                          key={expense.id}
                          gap={scale(14)}
                          items="center"
                        >
                          <YStack
                            width={scale(58)}
                            height={scale(58)}
                            justify="center"
                            items="center"
                            // gap={scale(2)}
                            borderWidth={1}
                            rounded={scale(12)}
                            borderColor="$borderColor"
                          >
                            <MyText
                              color="$textPrimary"
                              fontSize={scale(16)}
                              style={{ fontFamily: "MPlusRounded700" }}
                            >
                              {day}
                            </MyText>
                            <MyText
                              color="$textSecondary"
                              fontSize={scale(12)}
                              style={{ fontFamily: "MPlusRounded500" }}
                            >
                              {month}
                            </MyText>
                          </YStack>

                          <YStack
                            flex={1}
                            rounded={scale(12)}
                            // px={scale(18)}
                            height={scale(58)}
                            gap={scale(12)}
                            // borderWidth={1}
                            items="center"
                            borderColor="$borderColor"
                            justify="center"
                          >
                            <XStack justify="space-between" items="flex-start">
                              <YStack gap={scale(4)} flex={1}>
                                <MyText
                                  color="$textPrimary"
                                  fontSize={scale(15)}
                                  style={{ fontFamily: "MPlusRounded600" }}
                                >
                                  {expense.description || "Untitled expense"}
                                </MyText>
                                <MyText
                                  color="$textSecondary"
                                  fontSize={scale(12)}
                                  style={{ fontFamily: "MPlusRounded500" }}
                                >
                                  {payerName} paid{" "}
                                  {formatCurrency(expense.amount)}
                                </MyText>
                              </YStack>

                              <YStack items="flex-end" gap={scale(4)}>
                                <MyText
                                  color="$textSecondary"
                                  fontSize={scale(12)}
                                  style={{
                                    fontFamily: "MPlusRounded600",
                                    color: involvement.color,
                                  }}
                                >
                                  {involvement.label}
                                </MyText>
                                {typeof involvement.amount === "number" ? (
                                  <MyText
                                    color="$textPrimary"
                                    fontSize={scale(14)}
                                    style={{
                                      fontFamily: "MPlusRounded700",
                                      color: involvement.color,
                                    }}
                                  >
                                    {formatCurrency(involvement.amount)}
                                  </MyText>
                                ) : null}
                              </YStack>
                            </XStack>
                          </YStack>
                        </XStack>
                      );
                    })
                  )}
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
          // borderWidth={1}
          borderColor="green"
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
