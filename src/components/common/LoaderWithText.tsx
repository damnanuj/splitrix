import { GetThemeValueForKey, YStack } from "tamagui";
import { ActivityIndicator, OpaqueColorValue } from "react-native";
import MyText from "../customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import themeColors from "../../utils/theme/colors";

const LoaderWithText = ({
  text,
  color = themeColors.dark.YELLOW,
  textColor = themeColors.dark.TEXT_SECONDARY,
  fontSize = scale(16),
  fontWeight = "normal",
}: {
  text: string;
  color?: string;
  textColor?: OpaqueColorValue | GetThemeValueForKey<"color"> | undefined;
  fontSize?: number;
  fontWeight?:
    | "normal"
    | "bold"
    | "italic"
    | "underline"
    | "line-through"
    | "none";
}) => {
  return (
    <YStack flex={1} justify="center" items="center" gap={scale(10)}>
      <ActivityIndicator size="large" color={color} />
      <MyText
        color={textColor}
        fontSize={fontSize}
        fontWeight={fontWeight as any}
      >
        {text}
      </MyText>
    </YStack>
  );
};

export default LoaderWithText;
