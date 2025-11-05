import { View } from "react-native";
import { XStack, YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import ShimmerSkeleton from "../../../../components/common/ShimmerSkeleton";

interface SkeletonUserItemProps {
  delay?: number;
}

const SkeletonUserItem = ({ delay = 0 }: SkeletonUserItemProps) => {
  return (
    <XStack
      gap={scale(20)}
      items="center"
      justify="space-between"
      py={scale(15)}
      px={scale(4)}
    >
      <XStack gap={scale(20)} items="center" flex={1}>
        {/* Avatar skeleton */}
        <ShimmerSkeleton
          width={scale(50)}
          height={scale(50)}
          borderRadius={scale(10)}
          delay={delay}
        />

        {/* Text content skeleton */}
        <YStack flex={1} gap={scale(8)}>
          {/* Name skeleton */}
          <ShimmerSkeleton
            width="80%"
            height={scale(16)}
            borderRadius={scale(4)}
            delay={delay + 100}
          />

          {/* Email skeleton */}
          <ShimmerSkeleton
            width="60%"
            height={scale(14)}
            borderRadius={scale(4)}
            delay={delay + 200}
          />
        </YStack>
      </XStack>

      {/* Button skeleton */}
      <ShimmerSkeleton
        width={scale(80)}
        height={scale(40)}
        borderRadius={scale(8)}
        delay={delay + 300}
      />
    </XStack>
  );
};

const AddNewFriendSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

  return (
    <YStack flex={1} mb={scale(80)} gap={scale(8)}>
      {skeletonItems.map((item, index) => (
        <View key={item}>
          <SkeletonUserItem delay={index * 100} />
          {index < skeletonItems.length - 1 && <YStack height={scale(8)} />}
        </View>
      ))}
    </YStack>
  );
};

export default AddNewFriendSkeleton;
