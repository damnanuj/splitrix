import { Stack, useTheme, XStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import Feather from "@expo/vector-icons/Feather";
import { scale } from "src/utils/functions/dimensions";
import { useRouter } from "expo-router";
const BackButtonWithHeader = ({ title = "Provide a title prop" }) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <XStack
      //   borderWidth={1}
      borderColor={"red"}
    >
      <XStack
        // borderWidth={1}
        borderColor={"red"}
        py={scale(15)}
        items={"center"}
        gap={scale(10)}
        onPress={() => router.back()}
      >
        <Stack borderColor={"red"}>
          <Feather
            name="chevron-left"
            size={22}
            color={theme.textPrimary.val}
          />
        </Stack>
        <MyText fontSize={scale(18)}>{title}</MyText>
      </XStack>
    </XStack>
  );
};

export default BackButtonWithHeader;
