import { ScrollView, Stack, XStack, YStack, Image } from "tamagui";
import { RefreshControl } from "react-native";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import themeColors from "src/utils/theme/colors";
import Feather from "@expo/vector-icons/Feather";
import { useMyTransactions } from "src/hooks/billing/useMyTransactions";
import { getRandomIcon } from "src/utils/functions/getRandomIcon";
import ICONS from "src/utils/icons";
import { AllTransactionsSkeleton } from "./skeleton";

const AllTransactions = () => {
  const {
    data: transactions = [],
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useMyTransactions();

  const handleRefresh = () => {
    refetch();
  };

  const formatTransactionDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${month} ${day} ${year} | ${displayHours}:${displayMinutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <YStack borderColor={"red"} flex={1} gap={scale(20)}>
        <XStack justify={"space-between"} items={"center"}>
          <MyText color={"$textPrimary"} fontSize={scale(16)}>
            All Transactions
          </MyText>
          {/* <MyText color={"$accentYellow"}>View All</MyText> */}
        </XStack>

        <YStack borderColor={"white"} flex={1} pb={scale(80)}>
          <AllTransactionsSkeleton />
        </YStack>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack
        borderColor={"red"}
        flex={1}
        gap={scale(20)}
        justify="center"
        items="center"
        py={scale(40)}
      >
        <MyText color="$textSecondary" fontSize={scale(14)}>
          Failed to load transactions
        </MyText>
      </YStack>
    );
  }

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
        {/* <MyText color={"$accentYellow"}>View All</MyText> */}
      </XStack>

      <YStack
        //   borderWidth={1}
        borderColor={"white"}
        flex={1}
        pb={scale(80)}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor="#FFD700"
              colors={["#FFD700"]}
            />
          }
          contentContainerStyle={{
            //   borderWidth: 1,
            borderColor: "green",
            // gap: scale(15),
          }}
        >
          {transactions.length === 0 ? (
            <YStack
              items="center"
              justify="center"
              py={scale(0)}
              gap={scale(0)}
              // borderWidth={1}
              borderColor="red"
            >
              <Image
                source={require("../../../../assets/images/card-payment.png")}
                width={scale(280)}
                height={scale(250)}
                resizeMode="cover"
                borderWidth={1}
                borderColor="red"
              />
              <YStack items="center" gap={scale(8)}>
                <MyText color="$textSecondary" fontSize={scale(16)}>
                  No transactions yet
                </MyText>
                <MyText
                  color="$textSecondary"
                  fontSize={scale(14)}
                  style={{ textAlign: "center" }}
                >
                  Your transactions will appear here
                </MyText>
              </YStack>
            </YStack>
          ) : (
            transactions.map((transaction, index) => {
              // Use groupId + timing as unique key
              const uniqueKey = `${transaction.groupId}-${transaction.timing}-${index}`;
              // Use timing + title + index for seed to ensure each transaction gets a unique random icon
              const seed = `${transaction.timing}-${transaction.title}-${index}`;
              const { icon, iconColor } = getRandomIcon(seed);

              // Use groupIcon if available, otherwise use random icon
              const hasGroupIcon =
                transaction.groupIcon &&
                transaction.groupIcon.trim().length > 0;

              return (
                <TransactionItem
                  key={uniqueKey}
                  iconColor={iconColor}
                  icon={icon}
                  groupIcon={hasGroupIcon ? transaction.groupIcon : undefined}
                  title={transaction.title}
                  amount={transaction.amount}
                  time={formatTransactionDate(transaction.timing)}
                  groupName={transaction.groupName}
                />
              );
            })
          )}
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
  groupIcon?: string;
  groupName: string;
}

const TransactionItem = ({
  icon,
  title,
  amount,
  time,
  iconColor,
  groupIcon,
  groupName,
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
        overflow="hidden"
      >
        {groupIcon ? (
          <Image
            source={{ uri: groupIcon }}
            width={55}
            height={55}
            rounded={scale(10)}
          />
        ) : (
          <Feather name={icon as any} size={25} color={iconColor} />
        )}
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
        <MyText fontSize={scale(11)} color={"$textSecondary"} mt={scale(2)}>
          {groupName}
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
