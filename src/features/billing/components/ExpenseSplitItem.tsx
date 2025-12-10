import MyText from "src/components/customTabBars/styleComponents/MyText";
import { useAuthStore } from "src/stores/authStore";
import { scale } from "src/utils/functions/dimensions";
import { Stack, XStack, YStack } from "tamagui";

const ExpenseSplitItem = ({ splitBill }: { splitBill: any }) => {
  const { paidBy, yourStake } = splitBill;
  const { authData } = useAuthStore();

  console.log(authData, "-<<<<<<authData");

  const paidByName = authData?._id === paidBy.id ? "You" : paidBy.name;
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
        <MyText color={"$textPrimary"}>9</MyText>
        <MyText color={"$textPrimary"}>Dec</MyText>
      </Stack>

      <YStack justify="center" flex={1}>
        <MyText
          color={"$textPrimary"}
          fontSize={scale(16)}
          style={{ fontFamily: "MPlusRounded700" }}
        >
          Something trip bill
        </MyText>
        <MyText fontSize={scale(13)} color={"$textSecondary"}>
          {paidByName} paid ₹90.00
        </MyText>
      </YStack>

      <Stack borderColor="red">
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
          ₹45.00
        </MyText>
      </Stack>
    </XStack>
  );
};

export default ExpenseSplitItem;
