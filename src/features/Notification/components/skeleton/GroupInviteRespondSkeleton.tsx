import { XStack, YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import ShimmerSkeleton from "src/components/common/ShimmerSkeleton";

const GroupInviteRespondSkeleton = () => {
  return (
    <YStack gap={scale(24)} items="center" px={scale(20)}>
      {/* Header with Icon and Title */}
      <YStack items="center" gap={scale(16)}>
        {/* Icon skeleton */}
        <ShimmerSkeleton
          width={scale(80)}
          height={scale(80)}
          borderRadius={scale(24)}
          delay={0}
        />

        {/* Title section skeleton */}
        <YStack items="center" gap={scale(8)}>
          {/* Title skeleton */}
          <ShimmerSkeleton
            width={scale(180)}
            height={scale(22)}
            borderRadius={scale(4)}
            delay={100}
          />
          {/* Subtitle skeleton */}
          <ShimmerSkeleton
            width={scale(200)}
            height={scale(13)}
            borderRadius={scale(4)}
            delay={200}
          />
        </YStack>
      </YStack>

      {/* Group Details Card */}
      <YStack
        bg="$background"
        p={scale(20)}
        rounded={scale(20)}
        width="100%"
        borderWidth={1}
        borderColor="$borderColor"
        gap={scale(16)}
      >
        {/* Group Name and Description */}
        <YStack gap={scale(8)}>
          <XStack items="center" gap={scale(12)}>
            {/* Small avatar skeleton */}
            <ShimmerSkeleton
              width={scale(40)}
              height={scale(40)}
              borderRadius={scale(12)}
              delay={300}
            />
            <YStack flex={1} gap={scale(6)}>
              {/* Group name skeleton */}
              <ShimmerSkeleton
                width="70%"
                height={scale(18)}
                borderRadius={scale(4)}
                delay={400}
              />
              {/* Description skeleton */}
              <ShimmerSkeleton
                width="90%"
                height={scale(14)}
                borderRadius={scale(4)}
                delay={500}
              />
            </YStack>
          </XStack>
        </YStack>

        {/* Group Creator */}
        <YStack gap={scale(8)}>
          {/* Label skeleton */}
          <ShimmerSkeleton
            width={scale(80)}
            height={scale(13)}
            borderRadius={scale(4)}
            delay={600}
          />
          <XStack items="center" gap={scale(12)}>
            {/* Creator avatar skeleton */}
            <ShimmerSkeleton
              width={scale(35)}
              height={scale(35)}
              borderRadius={scale(18)}
              delay={700}
            />
            <YStack flex={1} gap={scale(6)}>
              {/* Creator name skeleton */}
              <ShimmerSkeleton
                width="60%"
                height={scale(15)}
                borderRadius={scale(4)}
                delay={800}
              />
              {/* Date text skeleton */}
              <ShimmerSkeleton
                width="85%"
                height={scale(13)}
                borderRadius={scale(4)}
                delay={900}
              />
            </YStack>
          </XStack>
        </YStack>

        {/* Group Members */}
        <YStack gap={scale(8)}>
          <XStack items="center" justify="space-between">
            {/* Members label skeleton */}
            <ShimmerSkeleton
              width={scale(100)}
              height={scale(13)}
              borderRadius={scale(4)}
              delay={1000}
            />
            {/* Member count skeleton */}
            <ShimmerSkeleton
              width={scale(70)}
              height={scale(12)}
              borderRadius={scale(4)}
              delay={1100}
            />
          </XStack>
          {/* Members list text skeleton */}
          <ShimmerSkeleton
            width="100%"
            height={scale(14)}
            borderRadius={scale(4)}
            delay={1200}
          />
        </YStack>
      </YStack>

      {/* Action Buttons Skeleton */}
      <XStack gap={scale(16)} width="100%">
        {/* Decline button skeleton */}
        <ShimmerSkeleton
          width="48%"
          height={scale(56)}
          borderRadius={scale(16)}
          delay={1300}
        />
        {/* Accept button skeleton */}
        <ShimmerSkeleton
          width="48%"
          height={scale(56)}
          borderRadius={scale(16)}
          delay={1400}
        />
      </XStack>

      {/* Success Message and Visit Group Button Skeleton */}
      <YStack gap={scale(16)} width="100%">
        {/* Success message card skeleton */}
        <YStack
          bg="$background"
          p={scale(16)}
          rounded={scale(16)}
          width="100%"
          borderWidth={1}
          borderColor="$borderColor"
          items="center"
          gap={scale(8)}
        >
          {/* Success icon and title row skeleton */}
          <XStack items="center" gap={scale(8)}>
            {/* Icon skeleton */}
            <ShimmerSkeleton
              width={scale(20)}
              height={scale(20)}
              borderRadius={scale(10)}
              delay={1500}
            />
            {/* Success title skeleton */}
            <ShimmerSkeleton
              width={scale(200)}
              height={scale(16)}
              borderRadius={scale(4)}
              delay={1600}
            />
          </XStack>
          {/* Success message text skeleton */}
          <ShimmerSkeleton
            width="80%"
            height={scale(14)}
            borderRadius={scale(4)}
            delay={1700}
          />
        </YStack>

        {/* Visit Group Button skeleton */}
        <ShimmerSkeleton
          width="100%"
          height={scale(56)}
          borderRadius={scale(16)}
          delay={1800}
        />
      </YStack>
    </YStack>
  );
};

export default GroupInviteRespondSkeleton;
