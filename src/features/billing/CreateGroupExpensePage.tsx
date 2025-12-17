import { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  ScrollView,
  Spinner,
  Stack,
  XStack,
  YStack,
} from "tamagui";
import { useToastController } from "@tamagui/toast";
import { useLocalSearchParams } from "expo-router";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { useGroupDetails } from "src/hooks/group/useGroupDetails";
import { useAuthStore } from "src/stores/authStore";
import DateTimePickerComponent from "./components/DateTimePickerComponent";
import { ModalSheet } from "src/components/common/ModalSheet";
import SplitExpenseSheet from "./components/SplitExpenseSheet";
import { Pressable } from "react-native";
import { useCreateExpense } from "src/hooks/billing/useCreateExpense";

const CreateGroupExpensePage = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const { data, isLoading, error } = useGroupDetails(groupId || "");
  console.log(data, "-<<<<<<data");
  const group = data;
  const members = group?.members || [];
  const { authData } = useAuthStore();
  const toast = useToastController();
  const createExpenseMutation = useCreateExpense(groupId);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidById, setPaidById] = useState<string | undefined>(
    authData?._id || members[0]?._id
  );
  const [expenseDate, setExpenseDate] = useState<Date>(new Date());
  const [expenseTime, setExpenseTime] = useState<Date>(new Date());
  const [paidBySheetOpen, setPaidBySheetOpen] = useState(false);
  const [splitSheetOpen, setSplitSheetOpen] = useState(false);

  const paidByMember = useMemo(() => {
    return members.find((member) => member._id === paidById);
  }, [members, paidById]);

  const totalAmount = Number(amount) || 0;

  const handleSplitConfirm = async (splitResult: {
    splitMode: "amount" | "share" | "percent";
    shares: Record<string, number>;
    selectedMemberIds: string[];
  }) => {
    if (!group?._id || !paidById || !authData?._id) {
      toast.show("Missing expense info", {
        message: "Please ensure payer, group and user details are available.",
      });
      throw new Error("Required identifiers missing for expense creation");
    }

    const shareEntries = splitResult.selectedMemberIds.map((memberId) => ({
      user: memberId,
      amount: Number(splitResult.shares[memberId] || 0),
    }));

    const expensePayload = {
      title: description.trim() || "Untitled expense",
      amount: Number(amount) || 0,
      group: group?._id,
      paidBy: paidById,
      createdBy: authData?._id,
      splitType: splitResult.splitMode,
      shares: shareEntries,
    };

    try {
      const response = await createExpenseMutation.mutateAsync(expensePayload);
      toast.show(response?.msg || "Expense added", {
        message: description.trim()
          ? `Saved as: ${description.trim()}`
          : undefined,
      });
      setAmount("");
      setDescription("");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while creating expense.";
      toast.show("Failed to add expense", {
        message: errorMessage,
      });
      throw error;
    }
  };

  // Only show loading if we don't have cached data
  if (isLoading && !data) {
    return (
      <YStack
        flex={1}
        bg="$background"
        justify="center"
        items="center"
        gap={scale(12)}
      >
        <Spinner size="large" color="$textPrimary" />
        <MyText color="$textSecondary" fontSize={scale(15)}>
          Loading group info...
        </MyText>
      </YStack>
    );
  }

  if (error || !group) {
    return (
      <YStack
        flex={1}
        bg="$background"
        justify="center"
        items="center"
        gap={scale(10)}
      >
        <MyText color="$textPrimary" fontSize={scale(16)}>
          {error?.message || "Unable to load group details"}
        </MyText>
        <Button onPress={() => {}} bg="$accentYellow" color="$accentBlack">
          Try Again
        </Button>
      </YStack>
    );
  }

  const getAvatarSource = (name: string, profilePicture?: string) => {
    return (
      profilePicture ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "User"
      )}&background=2f3640&color=ffffff`
    );
  };

  const handleNext = () => {
    if (!totalAmount || members.length === 0) return;
    setSplitSheetOpen(true);
  };

  return (
    <>
      <YStack flex={1} bg="$background">
        <ScrollView
          contentContainerStyle={{
            pb: scale(120),
            px: scale(24),
            pt: scale(16),
            gap: scale(18),
          }}
          showsVerticalScrollIndicator={false}
        >
          <BackButtonWithHeader title={`Split expense with ${group.name}`} />

          <YStack gap={scale(8)}>
            <MyText color="$textSecondary" fontSize={scale(14)}>
              Total Amount
            </MyText>
            <Input
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              height={scale(60)}
              fontSize={scale(28)}
              fontWeight="700"
              color="$textPrimary"
              bg="$backgroundSecondary"
              borderColor="$backgroundSecondary"
              textAlign="center"
            />
          </YStack>

          <YStack gap={scale(8)}>
            <MyText color="$textSecondary" fontSize={scale(14)}>
              Paid by
            </MyText>
            <Pressable onPress={() => setPaidBySheetOpen(true)}>
              <XStack
                borderWidth={1}
                borderColor="$borderPrimary"
                rounded={scale(16)}
                px={scale(14)}
                py={scale(12)}
                items="center"
                gap={scale(12)}
              >
                <Avatar size={scale(48)} rounded={scale(14)}>
                  <Avatar.Image
                    src={getAvatarSource(
                      paidByMember?.name || "You",
                      paidByMember?.profilePicture ||
                        authData?.profilePicture ||
                        undefined
                    )}
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="#444" />
                </Avatar>
                <YStack flex={1}>
                  <MyText
                    color="$textPrimary"
                    fontSize={scale(16)}
                    style={{ fontFamily: "MPlusRounded600" }}
                  >
                    {paidByMember?.name || authData?.name || "You"}
                  </MyText>
                  <MyText color="$textSecondary" fontSize={scale(12)}>
                    Tap to change payer
                  </MyText>
                </YStack>
              </XStack>
            </Pressable>
          </YStack>

          <YStack gap={scale(12)}>
            <MyText color="$textSecondary" fontSize={scale(14)}>
              When did this happen?
            </MyText>
            <XStack gap={scale(16)}>
              <YStack flex={1} gap={scale(6)}>
                <MyText color="$textSecondary" fontSize={scale(12)}>
                  Date
                </MyText>
                <DateTimePickerComponent
                  mode="date"
                  onChangeDate={(date) => {
                    if (date) setExpenseDate(date);
                  }}
                />
              </YStack>
              <YStack flex={1} gap={scale(6)}>
                <MyText color="$textSecondary" fontSize={scale(12)}>
                  Time
                </MyText>
                <DateTimePickerComponent
                  mode="time"
                  onChangeDate={(date) => {
                    if (date) setExpenseTime(date);
                  }}
                />
              </YStack>
            </XStack>
          </YStack>

          <YStack gap={scale(8)}>
            <MyText color="$textSecondary" fontSize={scale(14)}>
              Description
            </MyText>
            <Input
              placeholder="What was this expense for?"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              bg="$backgroundSecondary"
              borderColor="$backgroundSecondary"
              color="$textPrimary"
            />
          </YStack>
        </ScrollView>

        <Stack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          px={scale(24)}
          py={scale(16)}
          bg="$background"
          borderTopWidth={1}
          borderColor="$backgroundSecondary"
        >
          <Button
            onPress={handleNext}
            bg="$accentYellow"
            color="$accentBlack"
            fontSize={scale(16)}
            fontWeight="600"
            height={scale(56)}
            rounded={scale(16)}
            disabled={!totalAmount}
            pressStyle={{ opacity: 0.85 }}
          >
            Next
          </Button>
        </Stack>
      </YStack>

      <ModalSheet
        open={paidBySheetOpen}
        onOpenChange={setPaidBySheetOpen}
        snapPoints={[70]}
      >
        <YStack gap={scale(12)}>
          <MyText color="$textPrimary" fontSize={scale(18)} fontWeight="600">
            Who paid?
          </MyText>
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap={scale(10)} pb={scale(40)}>
              {members.map((member) => {
                const isSelected = paidById === member._id;
                return (
                  <Pressable
                    key={member._id}
                    onPress={() => {
                      setPaidById(member._id);
                      setPaidBySheetOpen(false);
                    }}
                  >
                    <XStack
                      p={scale(12)}
                      gap={scale(12)}
                      borderWidth={1}
                      borderColor={
                        isSelected ? "$accentYellow" : "$backgroundSecondary"
                      }
                      bg="$backgroundSecondary"
                      rounded={scale(12)}
                      items="center"
                    >
                      <Avatar size={scale(44)} rounded={scale(12)}>
                        <Avatar.Image
                          src={getAvatarSource(
                            member.name,
                            member.profilePicture
                          )}
                        />
                        <Avatar.Fallback delayMs={600} backgroundColor="#444" />
                      </Avatar>
                      <YStack flex={1}>
                        <MyText color="$textPrimary" fontSize={scale(15)}>
                          {member.name}
                        </MyText>
                        <MyText color="$textSecondary" fontSize={scale(12)}>
                          {member.email}
                        </MyText>
                      </YStack>
                      {isSelected && (
                        <MyText
                          color="$accentYellow"
                          fontSize={scale(12)}
                          fontWeight="600"
                        >
                          Selected
                        </MyText>
                      )}
                    </XStack>
                  </Pressable>
                );
              })}
            </YStack>
          </ScrollView>
        </YStack>
      </ModalSheet>

      <SplitExpenseSheet
        open={splitSheetOpen}
        onOpenChange={setSplitSheetOpen}
        members={members}
        totalAmount={totalAmount}
        onConfirm={handleSplitConfirm}
      />
    </>
  );
};

export default CreateGroupExpensePage;
