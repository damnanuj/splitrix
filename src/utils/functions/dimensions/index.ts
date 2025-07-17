import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 844;

export const scale = (size: number, isHeight = false): number => {
  const scaleFactor = isHeight
    ? SCREEN_HEIGHT / guidelineBaseHeight
    : SCREEN_WIDTH / guidelineBaseWidth;
  const scaledValue = size * scaleFactor;

  return Math.round(scaledValue);
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };
