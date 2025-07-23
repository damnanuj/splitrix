import { Circle, Image, Stack, useTheme, XStack, YStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import themeColors from "src/utils/theme/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { scale } from "src/utils/functions/dimensions";
import { Avatar } from "tamagui";
import { useRouter } from "expo-router";
import { useAuthStore } from "src/stores/authStore";

const UserHeader = () => {
  const theme = useTheme();

  const router = useRouter();

  const { authData }: any = useAuthStore();
  // console.log(authData, "sfdsfdfdfsdfsdfs");

  return (
    <XStack
      items={"center"}
      borderBottomWidth={1}
      borderBottomColor={"$borderColor"}
      py={scale(15)}
      gap={scale(15)}
    >
      <Avatar circular size={scale(50)}>
        <Avatar.Image
          accessibilityLabel="Nate Wienert"
          src={
            authData?.profilePicture ||
            "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
          }
        />
        <Avatar.Fallback delayMs={600} backgroundColor="lightgray" />
      </Avatar>
      <YStack
        flex={1}
        // borderWidth={1}
        borderColor={"white"}
      >
        <MyText
          color={"$textPrimary"}
          style={{ fontFamily: "MPlusRounded700" }}
          fontSize={scale(21)}
        >
          Hi, {authData?.name}!
        </MyText>

        <MyText fontSize={scale(12)} color={"$textSecondary"}>
          Easily split bills & track expenses
        </MyText>
      </YStack>

      <Stack
        onPress={() => {
          router.push("/notification");
        }}
        bg={"$backgroundSecondary"}
        p={scale(12)}
        rounded={scale(10)}
      >
        <FontAwesome5 name="bell" size={20} color={theme.textPrimary.val} />
      </Stack>
    </XStack>
  );
};

export default UserHeader;
