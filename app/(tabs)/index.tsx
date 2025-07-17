import { Button, Text, YStack } from "tamagui";
import { useRouter } from "expo-router";
import Colors from "constants/Colors";
import themeColors from "src/utils/theme/colors";
import Homepage from "src/container/Home/Homepage";

export default function TabOneScreen() {
  const router = useRouter();

  return <Homepage />;
}
