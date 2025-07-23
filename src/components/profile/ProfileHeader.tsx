import { scale } from "src/utils/functions/dimensions";
import { Avatar, Stack, useTheme, XStack, YStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuthStore } from "src/stores/authStore";
import { useRouter } from "expo-router";
export default function ProfileHeader() {
  const theme = useTheme();
  const router = useRouter();
  // const logout = useAuthStore((state) => state.logout);
  const { authData, logout }: any = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <YStack
      gap={scale(15)}
      // borderWidth={2}
      borderColor={"red"}
    >
      <MyText fontSize={scale(20)}>My Profile</MyText>
      <XStack
        // borderWidth={1}
        borderColor={"red"}
        gap={scale(15)}
        py={scale(10)}
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
            {authData?.name}
          </MyText>
          <MyText fontSize={scale(12)} color={"$textSecondary"}>
            Premium user
          </MyText>
        </YStack>
        <Stack
          bg={"$backgroundSecondary"}
          justify={"center"}
          items={"center"}
          p={scale(10)}
          rounded={scale(10)}
          self={"center"}
          onPress={handleLogout}
        >
          <MaterialIcons
            name="logout"
            size={20}
            color={theme.textPrimary.val}
          />
        </Stack>
      </XStack>
    </YStack>
  );
}
