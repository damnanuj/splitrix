import { useRouter } from "expo-router";
import React from "react";
import { Stack, Text } from "tamagui";

const login = () => {
  const router = useRouter();

  const goToTabs = () => {
    router.replace("/(tabs)"); // From welcome2 to tabs
  };
  return (
    <Stack background={"red"} flex={1} borderWidth={1} borderColor={"red"}>
      
    </Stack>
  );
};

export default login;
