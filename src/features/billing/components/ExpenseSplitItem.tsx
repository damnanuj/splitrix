import MyText from "src/components/customTabBars/styleComponents/MyText";
import { formatAmount } from "src/features/FriendsGroup/screens/GroupDetailsScreen";
import { useAuthStore } from "src/stores/authStore";
import { scale } from "src/utils/functions/dimensions";
import { Stack, XStack, YStack } from "tamagui";
import { GroupExpense } from "src/stores/types";

const ExpenseSplitItem = ({ splitBill }: { splitBill: GroupExpense }) => {
  const { paidBy, yourStake, description, date, amount } = splitBill;
  const { authData } = useAuthStore();

  // Handle both id and _id properties from API response
  const paidById = (paidBy as any).id || paidBy._id;
  const paidByName = authData?._id === paidById ? "You" : paidBy.name;

  // Format date to show day and month
  const formatDateForDisplay = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[dateObj.getMonth()];
    return { day, month };
  };

  const { day, month } = formatDateForDisplay(date);

  return (
    <XStack
      gap={scale(20)}
      items="center"
      mb={scale(10)}
      borderColor={"$borderPrimary"}
      rounded={scale(10)}
      py={scale(5)}
    >
      <Stack
        borderWidth={1}
        borderColor={"$borderPrimary"}
        width={55}
        height={55}
        rounded={scale(10)}
        justify="center"
        items="center"
      >
        <MyText color={"$textPrimary"} fontSize={scale(14)}>
          {day}
        </MyText>
        <MyText color={"$textPrimary"} fontSize={scale(12)}>
          {month}
        </MyText>
      </Stack>

      <YStack justify="center" flex={1}>
        <MyText
          color={"$textPrimary"}
          fontSize={scale(16)}
          style={{ fontFamily: "MPlusRounded700" }}
        >
          {description}
        </MyText>
        <MyText fontSize={scale(13)} color={"$textSecondary"}>
          {paidByName} paid {formatAmount(amount)}
        </MyText>
      </YStack>

      <Stack>
        {yourStake.amount === 0 &&
        yourStake.displayMsg.includes("not part of this expense") ? (
          <MyText
            style={{ textAlign: "right" }}
            fontSize={scale(14)}
            color="$textSecondary"
          >
            Not involved
          </MyText>
        ) : (
          <>
            <MyText
              color={yourStake.amount > 0 ? "$accentGreen" : "$accentRed"}
              fontSize={scale(14)}
              style={{ fontFamily: "MPlusRounded700", textAlign: "right" }}
            >
              {yourStake.amount > 0 ? "You get back" : "Your share"}
            </MyText>
            <MyText
              style={{ textAlign: "right" }}
              fontSize={scale(14)}
              color={yourStake.amount > 0 ? "$accentGreen" : "$accentRed"}
            >
              {formatAmount(yourStake.amount)}
            </MyText>
          </>
        )}
      </Stack>
    </XStack>
  );
};

export default ExpenseSplitItem;
