import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useTheme, XStack, YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";

interface ShimmerSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  delay?: number;
}

const ShimmerSkeleton = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  delay = 0,
}: ShimmerSkeletonProps) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue, delay]);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  const opacity = shimmerValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });
  const theme = useTheme();

  // console.log(theme.shimmerPrimary, "shimmerPrimary");
  // console.log(theme.shimmerSecondary, "shimmerPrimary");

  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: theme.shimmerPrimary.val,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: theme.shimmerSecondary.val,
          opacity,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

export default ShimmerSkeleton;
