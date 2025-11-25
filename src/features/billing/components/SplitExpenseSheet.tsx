import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  ScrollView,
  Spinner,
  Square,
  XStack,
  YStack,
} from "tamagui";
import {
  Check,
  Divide,
  Equal,
  IndianRupee,
  Minus,
  Percent,
  PieChart,
  Plus,
  RefreshCcw,
} from "@tamagui/lucide-icons";
import { scale } from "src/utils/functions/dimensions";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { ModalSheet } from "src/components/common/ModalSheet";
import { Pressable } from "react-native";

type SplitMode = "amount" | "share" | "percent";

interface Member {
  _id: string;
  name: string;
  email?: string;
  profilePicture?: string;
}

interface SplitExpenseSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: Member[];
  totalAmount: number;
  onConfirm?: (payload: {
    splitMode: SplitMode;
    shares: Record<string, number>;
    selectedMemberIds: string[];
  }) => void | Promise<void>;
}

const SplitExpenseSheet = ({
  open,
  onOpenChange,
  members,
  totalAmount,
  onConfirm,
}: SplitExpenseSheetProps) => {
  const [splitMode, setSplitMode] = useState<SplitMode>("amount");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, number>>({});
  const [manualOverrides, setManualOverrides] = useState<
    Record<SplitMode, boolean>
  >({
    amount: false,
    share: false,
    percent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toCents = (value: number) => Math.round((Number(value) || 0) * 100);
  const fromCents = (value: number) => Number((value / 100).toFixed(2));
  const percentScale = 100;
  const toPercentUnits = (value: number) =>
    Math.max(0, Math.round((Number(value) || 0) * percentScale));
  const fromPercentUnits = (value: number) =>
    Number((value / percentScale).toFixed(2));

  const updateManualOverride = (mode: SplitMode, value: boolean) => {
    setManualOverrides((prev) => {
      if (prev[mode] === value) return prev;
      return { ...prev, [mode]: value };
    });
  };

  useEffect(() => {
    if (open) {
      const defaultSelected = members.map((member) => member._id);
      setSelectedMemberIds(defaultSelected);
      const defaultValues: Record<string, number> = {};
      defaultSelected.forEach((id) => {
        defaultValues[id] = 0;
      });
      setValues(defaultValues);
      setManualOverrides({ amount: false, share: false, percent: false });
    }
  }, [open, members]);

  useEffect(() => {
    setManualOverrides((prev) => {
      if (!prev.amount && !prev.share && !prev.percent) return prev;
      return { amount: false, share: false, percent: false };
    });
  }, [selectedMemberIds]);

  const splitAmountsEqually = useCallback(() => {
    if (!selectedMemberIds.length) return;
    const totalCents = toCents(totalAmount);
    const count = selectedMemberIds.length;
    if (count === 0) return;
    const baseShare = Math.floor(totalCents / count);
    const remainder = totalCents % count;

    setValues((prev) => {
      const next = { ...prev };
      selectedMemberIds.forEach((id, index) => {
        const cents = baseShare + (index < remainder ? 1 : 0);
        next[id] = fromCents(cents);
      });
      return next;
    });
    updateManualOverride("amount", false);
  }, [selectedMemberIds, totalAmount]);

  const splitSharesEqually = useCallback(() => {
    if (!selectedMemberIds.length) return;
    setValues((prev) => {
      const next = { ...prev };
      selectedMemberIds.forEach((id) => {
        next[id] = 1;
      });
      return next;
    });
    updateManualOverride("share", false);
  }, [selectedMemberIds]);

  const splitPercentEqually = useCallback(() => {
    if (!selectedMemberIds.length) return;
    const totalUnits = 100 * percentScale;
    const count = selectedMemberIds.length;
    const baseUnits = Math.floor(totalUnits / count);
    let remainder = totalUnits % count;

    setValues((prev) => {
      const next = { ...prev };
      selectedMemberIds.forEach((id) => {
        const units = baseUnits + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder -= 1;
        next[id] = fromPercentUnits(units);
      });
      return next;
    });
    updateManualOverride("percent", false);
  }, [selectedMemberIds]);

  const allocateAmountForMember = useCallback(
    (memberId: string, rawAmount: number) => {
      if (!selectedMemberIds.includes(memberId)) return;
      const totalCents = toCents(totalAmount);
      const targetCents = Math.max(0, Math.min(totalCents, toCents(rawAmount)));
      const otherIds = selectedMemberIds.filter((id) => id !== memberId);
      const remainingCents = Math.max(0, totalCents - targetCents);

      setValues((prev) => {
        const next = { ...prev };
        next[memberId] = fromCents(targetCents);

        if (!otherIds.length) {
          return next;
        }

        const baseShare =
          otherIds.length > 0
            ? Math.floor(remainingCents / otherIds.length)
            : 0;
        let remainder = otherIds.length ? remainingCents % otherIds.length : 0;

        otherIds.forEach((id) => {
          const cents = baseShare + (remainder > 0 ? 1 : 0);
          if (remainder > 0) remainder -= 1;
          next[id] = fromCents(cents);
        });

        return next;
      });
      updateManualOverride("amount", true);
    },
    [selectedMemberIds, totalAmount]
  );

  const handleShareStep = useCallback(
    (memberId: string, delta: number) => {
      if (!selectedMemberIds.includes(memberId) || !delta) return;
      setValues((prev) => {
        const current = prev[memberId] ?? 0;
        const nextValue = Math.max(0, current + delta);
        return {
          ...prev,
          [memberId]: nextValue,
        };
      });
      updateManualOverride("share", true);
    },
    [selectedMemberIds]
  );

  const allocatePercentForMember = useCallback(
    (memberId: string, rawPercent: number) => {
      if (!selectedMemberIds.includes(memberId)) return;
      const totalUnits = 100 * percentScale;
      const targetUnits = Math.max(
        0,
        Math.min(totalUnits, toPercentUnits(rawPercent))
      );
      const otherIds = selectedMemberIds.filter((id) => id !== memberId);
      let remainingUnits = Math.max(0, totalUnits - targetUnits);

      setValues((prev) => {
        const next = { ...prev };
        next[memberId] = fromPercentUnits(targetUnits);

        if (!otherIds.length) {
          return next;
        }

        const baseShare =
          otherIds.length > 0
            ? Math.floor(remainingUnits / otherIds.length)
            : 0;
        let remainder = otherIds.length ? remainingUnits % otherIds.length : 0;

        otherIds.forEach((id) => {
          const units = baseShare + (remainder > 0 ? 1 : 0);
          if (remainder > 0) remainder -= 1;
          next[id] = fromPercentUnits(units);
        });

        return next;
      });
      updateManualOverride("percent", true);
    },
    [selectedMemberIds]
  );

  useEffect(() => {
    if (
      !open ||
      splitMode !== "amount" ||
      !selectedMemberIds.length ||
      manualOverrides.amount
    )
      return;
    splitAmountsEqually();
  }, [
    totalAmount,
    open,
    splitMode,
    selectedMemberIds,
    manualOverrides.amount,
    splitAmountsEqually,
  ]);

  useEffect(() => {
    if (
      !open ||
      splitMode !== "share" ||
      !selectedMemberIds.length ||
      manualOverrides.share
    )
      return;
    splitSharesEqually();
  }, [
    open,
    splitMode,
    selectedMemberIds,
    manualOverrides.share,
    splitSharesEqually,
  ]);

  useEffect(() => {
    if (
      !open ||
      splitMode !== "percent" ||
      !selectedMemberIds.length ||
      manualOverrides.percent
    )
      return;
    splitPercentEqually();
  }, [
    open,
    splitMode,
    selectedMemberIds,
    manualOverrides.percent,
    splitPercentEqually,
  ]);

  const handleToggleMember = (memberId: string) => {
    setSelectedMemberIds((prev) => {
      if (prev.includes(memberId)) {
        const next = prev.filter((id) => id !== memberId);
        if (next.length === 0) return prev;
        return next;
      }
      return [...prev, memberId];
    });
  };

  const handleValueChange = (memberId: string, text: string) => {
    const parsed = Number(text) || 0;
    if (splitMode === "amount") {
      allocateAmountForMember(memberId, parsed);
      return;
    }
    if (splitMode === "share") {
      setValues((prev) => ({
        ...prev,
        [memberId]: parsed > 0 ? parsed : 0,
      }));
      updateManualOverride("share", true);
      return;
    }
    if (splitMode === "percent") {
      allocatePercentForMember(memberId, parsed);
      return;
    }
    setValues((prev) => ({
      ...prev,
      [memberId]: parsed,
    }));
  };

  const handleSplitEqually = () => {
    if (!selectedMemberIds.length) return;
    if (splitMode === "amount") {
      splitAmountsEqually();
      return;
    }

    if (splitMode === "share") {
      splitSharesEqually();
      return;
    }

    if (splitMode === "percent") {
      splitPercentEqually();
    }
  };

  const computedShares = useMemo(() => {
    if (!selectedMemberIds.length) return {};

    if (splitMode === "amount") {
      return selectedMemberIds.reduce<Record<string, number>>((acc, id) => {
        acc[id] = Number(values[id] || 0);
        return acc;
      }, {});
    }

    if (splitMode === "share") {
      const totalShares = selectedMemberIds.reduce(
        (acc, id) => acc + (values[id] || 1),
        0
      );
      if (!totalShares) return {};
      return selectedMemberIds.reduce<Record<string, number>>((acc, id) => {
        const share = values[id] || 1;
        acc[id] = Number(((share / totalShares) * totalAmount || 0).toFixed(2));
        return acc;
      }, {});
    }

    const percentTotal = selectedMemberIds.reduce(
      (acc, id) => acc + (values[id] || 0),
      0
    );
    return selectedMemberIds.reduce<Record<string, number>>((acc, id) => {
      const percent = values[id] || 0;
      const normalizedPercent =
        percentTotal > 100 && percentTotal !== 0
          ? percent / percentTotal
          : percent / 100;
      acc[id] = Number((normalizedPercent * totalAmount || 0).toFixed(2));
      return acc;
    }, {});
  }, [selectedMemberIds, values, splitMode, totalAmount]);

  const handleDone = async () => {
    if (isSubmitting) return;
    if (!onConfirm) {
      onOpenChange(false);
      return;
    }
    try {
      setIsSubmitting(true);
      await onConfirm({
        splitMode,
        shares: computedShares,
        selectedMemberIds,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to confirm split", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModeChange = (mode: SplitMode) => {
    setSplitMode(mode);
    updateManualOverride(mode, false);
  };

  const renderModeButton = (
    mode: SplitMode,
    label: string,
    icon: React.ReactNode
  ) => {
    const isActive = splitMode === mode;
    return (
      <Button
        flex={1}
        bg={isActive ? "$accentYellow" : "$backgroundSecondary"}
        color={isActive ? "$accentBlack" : "$textSecondary"}
        fontSize={scale(14)}
        fontWeight="600"
        borderWidth={0}
        pressStyle={{ opacity: 0.85 }}
        onPress={() => handleModeChange(mode)}
      >
        <XStack gap={scale(6)} items="center" justify="center">
          {icon}
          <MyText
            color={isActive ? "$accentBlack" : "$textSecondary"}
            fontSize={scale(13)}
            style={{ fontFamily: "MPlusRounded600" }}
          >
            {label}
          </MyText>
        </XStack>
      </Button>
    );
  };

  const getAvatarSource = (member: Member) => {
    return (
      member.profilePicture ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        member.name || "User"
      )}&background=2f3640&color=ffffff`
    );
  };

  const getFieldLabel = () => {
    if (splitMode === "amount") return "Amount";
    if (splitMode === "share") return "Shares";
    return "Percent";
  };

  const getPlaceholder = () => {
    if (splitMode === "amount") return "0.00";
    if (splitMode === "share") return "1";
    return "0";
  };

  const isSplitEquallyDisabled = useMemo(() => {
    if (!selectedMemberIds.length) return true;
    if (splitMode === "amount") return !manualOverrides.amount;
    if (splitMode === "share") return !manualOverrides.share;
    return !manualOverrides.percent;
  }, [selectedMemberIds, splitMode, manualOverrides]);

  return (
    <ModalSheet open={open} onOpenChange={onOpenChange} snapPoints={[85]}>
      <YStack gap={scale(16)} flex={1}>
        <YStack gap={scale(6)}>
          <MyText color="$textPrimary" fontSize={scale(18)} fontWeight="600">
            Split Expense
          </MyText>
          <MyText color="$textSecondary" fontSize={scale(13)}>
            Select who is involved in this expense and how you want to split it.
          </MyText>
        </YStack>

        <XStack gap={scale(10)}>
          {renderModeButton(
            "amount",
            "Amount",
            <IndianRupee size={scale(16)} color="#111" />
          )}
          {renderModeButton(
            "share",
            "Share",
            <PieChart size={scale(16)} color="#111" />
          )}
          {renderModeButton(
            "percent",
            "Percent",
            <Percent size={scale(16)} color="#111" />
          )}
        </XStack>

        <XStack justify="space-between" items="center">
          <MyText color="$textSecondary" fontSize={scale(13)}>
            {selectedMemberIds.length}/{members.length} Selected
          </MyText>
          <Button
            size="$2"
            bg="transparent"
            color="$textPrimary"
            borderWidth={0}
            px={scale(5)}
            borderColor="$borderPrimary"
            disabled={isSplitEquallyDisabled}
            opacity={isSplitEquallyDisabled ? 0.5 : 1}
            onPress={handleSplitEqually}
          >
            <RefreshCcw
              size={scale(14)}
              color={
                isSplitEquallyDisabled ? "$textSecondary" : "$accentYellow"
              }
            />
            <MyText
              fontSize={scale(12)}
              style={{ fontFamily: "MPlusRounded700" }}
              color={
                isSplitEquallyDisabled ? "$textSecondary" : "$accentYellow"
              }
            >
              Split Equally
            </MyText>
          </Button>
        </XStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={scale(12)} pb={scale(24)}>
            {members.map((member) => {
              const isSelected = selectedMemberIds.includes(member._id);
              const value = values[member._id] ?? 0;
              const computedAmount =
                splitMode === "amount"
                  ? value
                  : computedShares[member._id] || 0;

              return (
                <XStack
                  key={member._id}
                  gap={scale(12)}
                  items="center"
                  borderWidth={1}
                  borderColor={
                    isSelected ? "$accentYellow" : "$backgroundSecondary"
                  }
                  overflow="hidden"
                  bg="$backgroundSecondary"
                  rounded={scale(12)}
                  opacity={isSelected ? 1 : 0.6}
                >
                  <XStack
                    //   width={"90%"}
                    onPress={() => handleToggleMember(member._id)}
                    p={scale(12)}
                    flex={1}
                    //   borderWidth={1}
                    borderColor="$borderPrimary"
                    items="center"
                    gap={scale(12)}
                  >
                    <Square
                      size={scale(22)}
                      rounded={scale(6)}
                      borderWidth={1}
                      borderColor={
                        isSelected ? "$accentYellow" : "$borderPrimary"
                      }
                      bg={isSelected ? "$accentYellow" : "$background"}
                      items="center"
                      justify="center"
                    >
                      {isSelected && (
                        <Check size={scale(14)} color="$accentBlack" />
                      )}
                    </Square>

                    <Avatar size={scale(44)} rounded={scale(12)}>
                      <Avatar.Image
                        src={getAvatarSource(member)}
                        accessibilityLabel={member.name}
                      />
                      <Avatar.Fallback delayMs={600} backgroundColor="#444" />
                    </Avatar>

                    <YStack>
                      <MyText
                        color="$textPrimary"
                        fontSize={scale(15)}
                        style={{ fontFamily: "MPlusRounded600" }}
                      >
                        {member.name}
                      </MyText>
                      {splitMode !== "amount" && (
                        <MyText color="$textSecondary" fontSize={scale(12)}>
                          {computedAmount.toFixed(2)}
                        </MyText>
                      )}
                    </YStack>
                  </XStack>

                  <YStack pr={scale(12)} gap={scale(4)}>
                    {splitMode === "amount" ? (
                      <XStack
                        // borderWidth={1}
                        // borderBottomWidth={1}
                        borderColor="$borderPrimary"
                        items="center"
                        gap={scale(6)}
                      >
                        <IndianRupee size={scale(18)} color="$textSecondary" />
                        <Input
                          value={String(value || "")}
                          placeholder={getPlaceholder()}
                          borderWidth={0}
                          fontSize={scale(20)}
                          style={{ fontFamily: "MPlusRounded800" }}
                          keyboardType="numeric"
                          editable={isSelected}
                          onChangeText={(text) =>
                            handleValueChange(member._id, text)
                          }
                          bg="transparent"
                          height="100%"
                          px={0}
                        />
                      </XStack>
                    ) : splitMode === "share" ? (
                      <XStack
                        items="center"
                        justify="flex-end"
                        //   gap={scale(12)}
                        rounded={scale(8)}
                        bg="$backgroundSecondary"
                        height={scale(30)}
                        //   borderWidth={1}
                        borderColor="$borderPrimary"
                        //   px={scale(8)}
                      >
                        <Button
                          p={0}
                          width={scale(30)}
                          height={scale(30)}
                          bg={
                            (value || 0) <= 0
                              ? "$backgroundSecondary"
                              : "$accentYellow"
                          }
                          borderWidth={(value || 0) <= 0 ? 1 : 0}
                          borderColor="$accentYellow"
                          disabled={!isSelected || (value || 0) <= 0}
                          opacity={!isSelected || (value || 0) <= 0 ? 0.5 : 1}
                          onPress={() => handleShareStep(member._id, -1)}
                        >
                          <Minus
                            size={scale(14)}
                            color={
                              (value || 0) <= 0
                                ? "$accentYellow"
                                : "$accentBlack"
                            }
                          />
                        </Button>

                        <MyText
                          px={scale(10)}
                          fontSize={scale(14)}
                          color="$textPrimary"
                          style={{ fontFamily: "MPlusRounded700" }}
                        >
                          {value || 0}
                        </MyText>

                        <Button
                          p={0}
                          width={scale(30)}
                          height={scale(30)}
                          bg={
                            isSelected
                              ? "$accentYellow"
                              : "$backgroundSecondary"
                          }
                          borderWidth={isSelected ? 0 : 1}
                          borderColor="$accentYellow"
                          disabled={!isSelected}
                          opacity={!isSelected ? 0.5 : 1}
                          onPress={() => handleShareStep(member._id, 1)}
                        >
                          <Plus
                            size={scale(14)}
                            color={
                              isSelected ? "$accentBlack" : "$accentYellow"
                            }
                          />
                        </Button>
                      </XStack>
                    ) : (
                      <XStack
                        items="center"
                        // gap={scale(4}
                        borderColor="$borderPrimary"
                      >
                        <Input
                          value={String(value || "")}
                          placeholder={getPlaceholder()}
                          borderColor="$borderPrimary"
                          keyboardType="numeric"
                          editable={isSelected}
                          onChangeText={(text) =>
                            handleValueChange(member._id, text)
                          }
                          bg="transparent"
                          px={scale(5)}
                          borderWidth={0}
                          fontSize={scale(16)}
                          style={{ fontFamily: "MPlusRounded700" }}
                        />
                        <MyText
                          fontSize={scale(16)}
                          color="$textSecondary"
                          style={{ fontFamily: "MPlusRounded600" }}
                        >
                          %
                        </MyText>
                      </XStack>
                    )}
                  </YStack>
                </XStack>
              );
            })}
          </YStack>
        </ScrollView>

        <Button
          onPress={handleDone}
          bg="$accentYellow"
          color="$accentBlack"
          fontSize={scale(16)}
          fontWeight="600"
          height={scale(52)}
          rounded={scale(12)}
          disabled={!selectedMemberIds.length || isSubmitting}
          opacity={!selectedMemberIds.length || isSubmitting ? 0.7 : 1}
          pressStyle={{ opacity: 0.85 }}
        >
          {isSubmitting ? (
            <Spinner color="$accentBlack" size="small" />
          ) : (
            <MyText color="$accentBlack" fontSize={scale(16)} fontWeight="600">
              Done
            </MyText>
          )}
        </Button>
      </YStack>
    </ModalSheet>
  );
};

export default SplitExpenseSheet;
