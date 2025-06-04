import React from "react";
import { Button, Input, Separator, Text, YStack, XStack, Stack } from "tamagui";
import { useRouter } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";

const index = () => {
  const router = useRouter();

  const handleSignIn = () => {
    // Fake sign-in → navigate to tabs
    router.push("/(tabs)");
  };

  return (
    <YStack
      px={40}
      py={60}
      backgroundColor="#1e1e1e"
      flex={1}
      justifyContent="center"
    >
      <SigninForm onSignIn={handleSignIn} />
    </YStack>
  );
};

export default index;

function SigninForm({ onSignIn }: { onSignIn: () => void }) {
  const colorScheme = useColorScheme();
  return (
    <YStack width="100%" alignItems="center">
      <Text style={styles.text} color={"#FFC23F"} fontSize="$10">
        SPLITRIX
      </Text>

      <Input size="$4" bg={"transparent"} placeholder="Email" width="100%" />
      <Input
        size="$4"
        bg={"transparent"}
        placeholder="Password"
        secureTextEntry
        width="100%"
      />

      <XStack width="100%" justifyContent="flex-end">
        <Text color="#3BB154" fontSize="$2" fontWeight="500">
          Forgot password?
        </Text>
      </XStack>

      <Button
        width="100%"
        backgroundColor={"#FFC23F"}
        size="$4"
        onPress={onSignIn}
      >
        Sign In
      </Button>

      <XStack justify={"center"} items={"center"} gap={10}>
        <Stack
          borderWidth={0.5}
          borderStyle="dotted"
          flex={1}
          borderColor={"#fff"}
        ></Stack>
        <Text color={"#fff"}>OR</Text>
        <Stack
          borderWidth={0.5}
          flex={1}
          borderStyle="dotted"
          borderColor={"#fff"}
        ></Stack>
      </XStack>

      <Button width="100%" size="$4" theme="blue" icon={<GoogleIcon />}>
        Sign in with Google
      </Button>
    </YStack>
  );
}

function GoogleIcon() {
  return (
    <Text mr="$2" fontSize="$4">
      🌐
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Neon",
  },
});
