import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { Avatar, Stack, useTheme, XStack, YStack } from "tamagui";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProfileHeader from "src/components/profile/ProfileHeader";
import Settings from "src/components/profile/Settings";
import { SwitchDemo } from "src/components/profile/Switch";
const ProfilePage = () => {
  return (
    <YStack
      //   borderWidth={3}
      borderColor={"green"}
      bg={"$background"}
      flex={1}
      px={scale(25)}
      pt={scale(15)}
      justify={"space-between"}
    >
      <ProfileHeader />
      <Settings />
      {/* <SwitchDemo /> */}
    </YStack>
  );
};
export default ProfilePage;
