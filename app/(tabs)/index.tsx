import { Button, Text, YStack } from "tamagui";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      bg={"#1e1e1e"}
      items="center"
      borderWidth={2}
      borderColor={"red"}
      mb={0}
    >
      <Text fontSize={30}>WELCOME TO SPLITRIX</Text>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>

      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
      <Button onPress={() => router.push("/login")}>Login</Button>
    </YStack>
  );
}
