import { View } from "react-native";
import { XStack, YStack } from "tamagui";
import ShimmerSkeleton from "../../../../components/common/ShimmerSkeleton";
import { scale } from "src/utils/functions/dimensions";

interface SkeletonItemProps {
  delay?: number;
}

const GroupItemSkeleton = ({ delay = 0 }: SkeletonItemProps) => {
  return (
    <XStack
      gap={scale(20)}
      borderBottomWidth={1}
      borderColor={"$backgroundSecondary"}
      items="center"
      py={scale(20)}
    >
      <ShimmerSkeleton
        width={scale(55)}
        height={scale(55)}
        borderRadius={scale(10)}
        delay={delay}
      />

      <YStack flex={1} gap={scale(8)}>
        <ShimmerSkeleton
          width="70%"
          height={scale(16)}
          borderRadius={scale(4)}
          delay={delay + 100}
        />
        <ShimmerSkeleton
          width="60%"
          height={scale(12)}
          borderRadius={scale(4)}
          delay={delay + 200}
        />
      </YStack>

      <ShimmerSkeleton
        width={scale(18)}
        height={scale(18)}
        borderRadius={scale(4)}
        delay={delay + 300}
      />
    </XStack>
  );
};

const GroupsListSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <YStack flex={1} gap={scale(8)} pb={scale(80)}>
      {skeletonItems.map((item, index) => (
        <View key={item}>
          <GroupItemSkeleton delay={index * 120} />
        </View>
      ))}
    </YStack>
  );
};

export default GroupsListSkeleton;
