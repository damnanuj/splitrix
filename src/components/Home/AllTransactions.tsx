import { ScrollView, Stack, XStack, YStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import themeColors from "src/utils/theme/colors";
import Feather from "@expo/vector-icons/Feather";

const AllTransactions = () => {
  console.log("AllTransactions render");
  return (
    <YStack
      //   borderWidth={1}
      borderColor={"red"}
      flex={1}
      //   pb={scale(80)}
      gap={scale(20)}
    >
      <XStack justify={"space-between"} items={"center"}>
        <MyText color={"$textPrimary"} fontSize={scale(16)}>
          All Transactions
        </MyText>
        <MyText color={"$accentYellow"}>View All</MyText>
      </XStack>

      <YStack
        //   borderWidth={1}
        borderColor={"white"}
        flex={1}
        pb={scale(80)}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            //   borderWidth: 1,
            borderColor: "green",
            // gap: scale(15),
          }}
        >
          {billsData.map((bill, idx) => (
            <TransactionItem
              key={idx}
              iconColor={bill.iconColor}
              icon={bill.icon}
              title={bill.title}
              amount={bill.amount}
              time={bill.time}
            />
          ))}
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default AllTransactions;

interface TransactionItemProps {
  icon: string;
  title: string;
  amount: number;
  time: string;
  iconColor: string;
}

const TransactionItem = ({
  icon,
  title,
  amount,
  time,
  iconColor,
}: TransactionItemProps) => {
  return (
    <XStack gap={scale(20)} items="center" mb={scale(15)}>
      <Stack
        bg={"$backgroundSecondary"}
        width={55}
        height={55}
        rounded={scale(10)}
        justify="center"
        items="center"
      >
        <Feather name={icon} size={25} color={iconColor} />
      </Stack>

      <YStack justify="center" flex={1}>
        <MyText
          color={"$textPrimary"}
          fontSize={scale(16)}
          style={{ fontFamily: "MPlusRounded700" }}
        >
          {title}
        </MyText>
        <MyText fontSize={scale(12)} color={"$textSecondary"}>
          {time}
        </MyText>
      </YStack>

      <Stack>
        <MyText
          color={"$textPrimary"}
          fontSize={scale(16)}
          style={{ fontFamily: "MPlusRounded700" }}
        >
          ₹{amount.toFixed(2)}
        </MyText>
      </Stack>
    </XStack>
  );
};

const billsData = [
  {
    icon: "film",
    title: "Movie Tickets",
    amount: 320,
    time: "Jul 14 25 | 08:30 PM",
    iconColor: "#3498db", // blue
  },
  {
    icon: "zap",
    title: "Electricity Bill",
    amount: 1450,
    time: "Jul 13 25 | 06:00 PM",
    iconColor: "#f1c40f", // yellow
  },
  {
    icon: "shopping-cart",
    title: "Grocery Shopping",
    amount: 790,
    time: "Jul 12 25 | 04:15 PM",
    iconColor: "#2ecc71", // green
  },
  {
    icon: "home",
    title: "House Rent",
    amount: 18000,
    time: "Jul 01 25 | 12:00 PM",
    iconColor: "#9b59b6", // purple
  },
  {
    icon: "wifi",
    title: "WiFi Recharge",
    amount: 499,
    time: "Jul 10 25 | 10:00 AM",
    iconColor: "#e74c3c", // red
  },
  {
    icon: "phone",
    title: "Mobile Bill",
    amount: 299,
    time: "Jul 11 25 | 03:45 PM",
    iconColor: "#1abc9c", // teal
  },
  {
    icon: "coffee",
    title: "Cafe Snacks",
    amount: 220,
    time: "Jul 09 25 | 05:20 PM",
    iconColor: "#e67e22", // orange
  },
  {
    icon: "gift",
    title: "Gift Shopping",
    amount: 2100,
    time: "Jul 06 25 | 07:00 PM",
    iconColor: "#ff6b81", // pink
  },
  {
    icon: "globe",
    title: "Domain Renewal",
    amount: 799,
    time: "Jul 02 25 | 11:30 AM",
    iconColor: "#16a085", // emerald
  },
  {
    icon: "briefcase",
    title: "Coworking Rent",
    amount: 4000,
    time: "Jul 05 25 | 09:00 AM",
    iconColor: "#34495e", // dark gray
  },
];
