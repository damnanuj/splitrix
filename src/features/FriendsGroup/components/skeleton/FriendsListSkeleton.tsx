import { View } from "react-native";
import { XStack, YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import ShimmerSkeleton from "./ShimmerSkeleton";

interface SkeletonItemProps {
  delay?: number;
}

const SkeletonItem = ({ delay = 0 }: SkeletonItemProps) => {
  return (
    <XStack gap={scale(20)} items="center" py={scale(12)} px={scale(4)}>
      {/* Avatar skeleton */}
      <ShimmerSkeleton
        width={scale(60)}
        height={scale(60)}
        borderRadius={scale(10)}
        delay={delay}
      />

      {/* Text content skeleton */}
      <YStack flex={1} gap={scale(8)}>
        {/* Name skeleton */}
        <ShimmerSkeleton
          width="70%"
          height={scale(16)}
          borderRadius={scale(4)}
          delay={delay + 100}
        />

        {/* Status skeleton */}
        <ShimmerSkeleton
          width="50%"
          height={scale(12)}
          borderRadius={scale(4)}
          delay={delay + 200}
        />
      </YStack>
    </XStack>
  );
};

const FriendsListSkeleton = () => {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <YStack flex={1} mb={scale(80)} gap={scale(8)}>
      {skeletonItems.map((item, index) => (
        <View key={item}>
          <SkeletonItem delay={index * 100} />
          {index < skeletonItems.length - 1 && <YStack height={scale(8)} />}
        </View>
      ))}
    </YStack>
  );
};

export default FriendsListSkeleton;
