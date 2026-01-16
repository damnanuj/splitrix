import { View } from "react-native";
import { Stack, XStack, YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import ShimmerSkeleton from "../../../../components/common/ShimmerSkeleton";

interface TransactionItemSkeletonProps {
  delay?: number;
}

const TransactionItemSkeleton = ({ delay = 0 }: TransactionItemSkeletonProps) => {
  return (
    <XStack gap={scale(20)} items="center" mb={scale(15)}>
      {/* Icon skeleton */}
      <ShimmerSkeleton
        width={55}
        height={55}
        borderRadius={scale(10)}
        delay={delay}
      />

      {/* Text content skeleton */}
      <YStack justify="center" flex={1} gap={scale(4)}>
        {/* Title skeleton */}
        <ShimmerSkeleton
          width="70%"
          height={scale(16)}
          borderRadius={scale(4)}
          delay={delay + 100}
        />

        {/* Time skeleton */}
        <ShimmerSkeleton
          width="50%"
          height={scale(12)}
          borderRadius={scale(4)}
          delay={delay + 200}
        />

        {/* Group name skeleton */}
        <ShimmerSkeleton
          width="40%"
          height={scale(11)}
          borderRadius={scale(4)}
          delay={delay + 300}
        />
      </YStack>

      {/* Amount skeleton */}
      <Stack>
        <ShimmerSkeleton
          width={scale(60)}
          height={scale(16)}
          borderRadius={scale(4)}
          delay={delay + 100}
        />
      </Stack>
    </XStack>
  );
};

export default TransactionItemSkeleton;

