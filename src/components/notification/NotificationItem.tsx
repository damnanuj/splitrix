import { scale } from "src/utils/functions/dimensions";
import { Stack, XStack } from "tamagui";
import Feather from "@expo/vector-icons/Feather";
import MyText from "../customTabBars/styleComponents/MyText";

export const NotificationItem = ({
  title,
  icon,
  iconColor,
}: {
  title: string;
  icon: string;
  iconColor: string;
}) => {
  return (
    <XStack
      borderColor={"$backgroundSecondary"}
      gap={scale(20)}
      items="center"
      py={scale(10)}
    >
      <Stack
        bg={"$backgroundSecondary"}
        width={55}
        height={55}
        rounded={scale(10)}
        justify="center"
        items="center"
      >
        <Feather name={icon} size={25} color={iconColor} />
      </Stack>

      <Stack flex={1}>
        <MyText
          color={"$textPrimary"}
          style={{ fontFamily: "MPlusRounded700" }}
        >
          {title}
        </MyText>
      </Stack>
    </XStack>
  );
};
