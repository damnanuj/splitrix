import { View } from "react-native";
import { YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import TransactionItemSkeleton from "./TransactionItemSkeleton";

const AllTransactionsSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <YStack flex={1} pb={scale(80)}>
      {skeletonItems.map((item, index) => (
        <View key={item}>
          <TransactionItemSkeleton delay={index * 100} />
        </View>
      ))}
    </YStack>
  );
};

export default AllTransactionsSkeleton;

