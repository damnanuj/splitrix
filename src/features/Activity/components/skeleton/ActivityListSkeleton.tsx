import { View } from "react-native";
import { YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import ActivityItemSkeleton from "./ActivityItemSkeleton";

const ActivityListSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <YStack gap={scale(4)}>
      {skeletonItems.map((item, index) => (
        <View key={item}>
          <ActivityItemSkeleton delay={index * 100} />
        </View>
      ))}
    </YStack>
  );
};

export default ActivityListSkeleton;

