import { Stack, useTheme, XStack } from "tamagui";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import Feather from "@expo/vector-icons/Feather";

type FriendsHeaderProps = {
  title?: string;
};

const FriendsHeader = ({ title = "Friends List" }: FriendsHeaderProps) => {
  const theme = useTheme();
  return (
    <XStack
      // borderWidth={1}
      pt={scale(15)}
      borderColor={"red"}
      justify={"space-between"}
      items={"center"}
    >
      <MyText fontSize={scale(18)}>{title}</MyText>
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
