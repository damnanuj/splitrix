import { XStack, YStack, Stack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import ShimmerSkeleton from "../../../../components/common/ShimmerSkeleton";

interface ActivityItemSkeletonProps {
  delay?: number;
}

const ActivityItemSkeleton = ({ delay = 0 }: ActivityItemSkeletonProps) => {
  return (
    <XStack
      bg="$backgroundSecondary"
      borderColor="$borderPrimary"
      borderWidth={1}
      rounded={scale(12)}
      gap={scale(16)}
      items="center"
      py={scale(16)}
      px={scale(16)}
      mb={scale(12)}
    >
      {/* Icon Container Skeleton */}
      <Stack
        bg="$background"
        width={scale(48)}
        height={scale(48)}
        rounded={scale(12)}
        justify="center"
        items="center"
        borderWidth={1}
        borderColor="$borderPrimary"
      >
        <ShimmerSkeleton
          width={scale(22)}
          height={scale(22)}
          borderRadius={scale(4)}
          delay={delay}
        />
      </Stack>

      {/* Content Skeleton */}
      <YStack flex={1} gap={scale(4)}>
        {/* Summary Skeleton - 2 lines */}
        <YStack gap={scale(4)}>
          <ShimmerSkeleton
            width="85%"
            height={scale(18)}
            borderRadius={scale(4)}
            delay={delay + 100}
          />
          <ShimmerSkeleton
            width="60%"
            height={scale(18)}
            borderRadius={scale(4)}
            delay={delay + 150}
          />
        </YStack>

        {/* Group Name Skeleton */}
        <XStack items="center" gap={scale(6)}>
          <ShimmerSkeleton
            width={scale(20)}
            height={scale(20)}
            borderRadius={scale(6)}
            delay={delay + 200}
          />
          <ShimmerSkeleton
            width={scale(80)}
            height={scale(13)}
            borderRadius={scale(4)}
            delay={delay + 250}
          />
        </XStack>

        {/* Actor Info Skeleton */}
        <XStack items="center" gap={scale(6)} mt={scale(2)}>
          <ShimmerSkeleton
            width={scale(20)}
            height={scale(20)}
            borderRadius={scale(6)}
            delay={delay + 300}
          />
          <ShimmerSkeleton
            width={scale(100)}
            height={scale(12)}
            borderRadius={scale(4)}
            delay={delay + 350}
          />
        </XStack>

        {/* Amount Skeleton (optional, sometimes shown) */}
        <YStack mt={scale(2)}>
          <ShimmerSkeleton
            width={scale(70)}
            height={scale(14)}
            borderRadius={scale(4)}
            delay={delay + 400}
          />
        </YStack>
      </YStack>

      {/* Time Skeleton */}
      <YStack items="flex-end" gap={scale(2)}>
        <ShimmerSkeleton
          width={scale(50)}
          height={scale(11)}
          borderRadius={scale(4)}
          delay={delay + 100}
        />
        <ShimmerSkeleton
          width={scale(40)}
          height={scale(11)}
          borderRadius={scale(4)}
          delay={delay + 150}
        />
      </YStack>
    </XStack>
  );
};

export default ActivityItemSkeleton;

