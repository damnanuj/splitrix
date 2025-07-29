import { Stack, useTheme, XStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import Feather from "@expo/vector-icons/Feather";
const FriendsHeader = () => {
  const theme = useTheme();
  return (
    <XStack
      //   borderWidth={1}
      borderColor={"red"}
      justify={"space-between"}
      items={"center"}
    >
      <MyText fontSize={scale(18)}>Friends List</MyText>
      <Stack
        bg={"$backgroundSecondary"}
        justify={"center"}
        items={"center"}
        p={scale(10)}
        rounded={scale(10)}
        self={"center"}
        // onPress={handleLogout}
      >
        <Feather name="search" size={20} color={theme.textPrimary.val} />
      </Stack>
    </XStack>
  );
};

export default FriendsHeader;
