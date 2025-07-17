import React, { useEffect } from "react";
import {
  Button,
  Input,
  Separator,
  Text,
  YStack,
  XStack,
  Stack,
  Checkbox,
  CheckboxProps,
  Image,
  useTheme,
} from "tamagui";
import { useRouter } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import themeColors from "src/utils/theme/colors";
import { Check } from "@tamagui/lucide-icons";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Label } from "tamagui";

// android 402895169533-1pasnrcndcgc4j5rsj24pre97gn86hkb.apps.googleusercontent.com

const LoginPage = () => {
  console.log("LoginPage render");

  // useEffect(() => {

  //   () => {
  //     console.log("LoginPage unmounted");
  //   };
  // }, []);

  return (
    <YStack
      px={scale(25)}
      py={scale(60)}
      bg={"$background"}
      flex={1}
      //   justify="space-between"
      items={"center"}
      //   borderWidth={2}
      borderColor={"blue"}
    >
      <YStack
        justify={"center"}
        // mb={scale(40)}
        items={"center"}
        gap={scale(10)}
      >
        <MyText
          //   borderWidth={1}
          borderColor={"red"}
          fontSize={scale(100)}
          color={"$accentYellow"}
          style={{ fontFamily: "Sparkle" }}
          //   mb={scale(10)}
        >
          S
        </MyText>

        <MyText
          //   borderWidth={2}
          borderColor={"green"}
          style={styles.text}
          color={themeColors.dark.YELLOW}
          fontSize={scale(60)}
        >
          SPLITRIX
        </MyText>
        <MyText color={"$textSecondary"}>
          Easily split bills & track your expenses
        </MyText>
      </YStack>

      <SigninForm onSignIn={() => {}} />
    </YStack>
  );
};

export default LoginPage;

function SigninForm({ onSignIn }: { onSignIn: () => void }) {
  const theme = useTheme();
  return (
    <>
      <YStack
        mt={scale(60)}
        width="100%"
        items="center"
        // borderWidth={1}
        borderColor={"green"}
      >
        <YStack
          width="100%"
          gap={scale(10)}
          //   borderWidth={1}
          borderColor={"white"}
          mb={scale(20)}
        >
          <MyText color={"$textPrimary"} fontSize={scale(16)}>
            Email Address
          </MyText>
          <Input
            bg={"transparent"}
            placeholder="Enter Your Email"
            width="100%"
            height={scale(50)}
            rounded={scale(8)}
            borderWidth={scale(1.5)}
            borderColor={"$borderPrimary"}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
        </YStack>

        <YStack
          width="100%"
          gap={scale(10)}
          //   borderWidth={1}
          borderColor={"white"}
        >
          <MyText color={"$textPrimary"} fontSize={scale(16)}>
            Password
          </MyText>
          <Input
            bg={"transparent"}
            placeholder="Enter Your Password"
            secureTextEntry
            width="100%"
            height={scale(50)}
            rounded={scale(8)}
            borderWidth={scale(1.5)}
            borderColor={"$borderPrimary"}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
        </YStack>
        <XStack width="100%" items={"center"} justify={"space-between"}>
          <CheckboxWithLabel size="$3" />
          <MyText color="#3BB154" fontSize="$2" fontWeight="500">
            Forgot password?
          </MyText>
        </XStack>

        <Button
          width="100%"
          bg={themeColors.dark.YELLOW}
          size="$4"
          onPress={onSignIn}
        >
          <MyText>Sign In</MyText>
        </Button>

        <XStack
          my={scale(15)}
          //   borderWidth={1}
          borderColor={"red"}
          justify={"center"}
          items={"center"}
          gap={scale(15)}
        >
          <Stack
            borderWidth={0.5}
            borderStyle="dotted"
            flex={1}
            borderColor={"#fff"}
          ></Stack>
          <MyText color={"#fff"}>OR</MyText>
          <Stack
            borderWidth={0.5}
            flex={1}
            borderStyle="dotted"
            borderColor={"#fff"}
          ></Stack>
        </XStack>
        <Button
          width="100%"
          borderWidth={scale(1.5)}
          borderColor={themeColors.dark.TEXT_SECONDARY}
          size="$4"
          bg={"transparent"}
          icon={<GoogleIcon size={30} />}
        >
          <MyText color={"$textPrimary"}>Sign in with Google</MyText>
        </Button>
      </YStack>
    </>
  );
}

function CheckboxWithLabel({
  size,
  label = "Remember Me",
  ...checkboxProps
}: CheckboxProps & { label?: string }) {
  const id = `checkbox-${(size || "").toString().slice(1)}`;
  return (
    <XStack
      my={scale(5)}
      //   borderWidth={1}
      borderColor={"red"}
      items="center"
      gap={scale(5)}
    >
      <Checkbox id={id} size={size} {...checkboxProps}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>

      <Label htmlFor={id}>
        <MyText color={"$textPrimary"} htmlFor={id}>
          {label}
        </MyText>
      </Label>
    </XStack>
  );
}

function GoogleIcon({ size }) {
  return (
    <Image
      src={"https://img.icons8.com/fluency/48/google-logo.png"}
      alt="google-logo"
      height={scale(size)}
      width={scale(size)}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "NeoNeon",
  },
});
