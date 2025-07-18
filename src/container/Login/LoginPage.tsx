import React, { useEffect, useState } from "react";
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
  Form,
} from "tamagui";
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView, useColorScheme } from "react-native";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import themeColors from "src/utils/theme/colors";
import { Check } from "@tamagui/lucide-icons";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { Label } from "tamagui";
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axiosInstance from "src/api/api";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getUserData } from "src/api/queryFunctions/user";
import { loginUser } from "src/api/queryFunctions/auth";
import useLogin from "./hook";
import ToastControl, { CurrentToast } from "app/CurrentToast";

const LoginPage = () => {
  console.log("LoginPage render");

  return (
    <ScrollView
      // borderWidth={1}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      // borderColor={"red"}
    >
      <YStack
        px={scale(25)}
        py={scale(60)}
        bg={"$background"}
        height={"100%"}
        flex={1}
        //   justify="space-between"
        items={"center"}
        // borderWidth={2}
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

        <SigninForm />
      </YStack>
    </ScrollView>
  );
};

export default LoginPage;

function SigninForm() {
  const theme = useTheme();

  const handleGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;
        const { name, photo, email } = user;
        console.log(email, name, "googleResponse");
      }
    } catch (error) {
      console.log(error || "error while google login");
    }
  };

  const handleGoogleLogout = async () => {
    try {
      const response = await GoogleSignin.signOut();
      console.log(response, "logout response google");
    } catch (error) {}
  };

  const [signInForm, setSignInForm]: any = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setSignInForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const { login } = useLogin();

  const handleSigninForm = async (e: any) => {
    e.preventDefault();
    const res = await login(signInForm);
    console.log(res);
  };

  const isFieldError = false;
  const inputBordercolor = isFieldError ? "red" : "$borderPrimary";

  return (
    <>
      <Form
        mt={scale(60)}
        width="100%"
        items="center"
        // borderWidth={1}
        borderColor={"red"}
        onSubmit={() => handleSigninForm}
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
            placeholderTextColor={"$textSecondary"}
            focusStyle={{ borderColor: theme.accentYellow }}
            value={signInForm.email}
            onChangeText={(text) => handleChange("email", text)}
            htmlFor="email"
            bg={"transparent"}
            placeholder="Enter Your Email"
            width="100%"
            height={scale(50)}
            rounded={scale(8)}
            borderWidth={scale(1.5)}
            borderColor={inputBordercolor}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
          {isFieldError && <MyText color={"red"}>Email is required</MyText>}
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
            placeholderTextColor={"$textSecondary"}
            focusStyle={{ borderColor: theme.accentYellow }}
            value={signInForm.password}
            onChangeText={(text) => handleChange("password", text)}
            htmlFor="password"
            bg={"transparent"}
            placeholder="Enter Your Password"
            secureTextEntry
            width="100%"
            height={scale(50)}
            rounded={scale(8)}
            borderWidth={scale(1.5)}
            borderColor={inputBordercolor}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
          {isFieldError && <MyText color={"red"}>Password is required</MyText>}
        </YStack>
        <XStack width="100%" items={"center"} justify={"space-between"}>
          <CheckboxWithLabel size="$3" />
          <MyText color="#3BB154" fontSize="$2" fontWeight="500">
            Forgot password?
          </MyText>
        </XStack>
        <Form.Trigger asChild>
          <Button
            width="100%"
            bg={themeColors.dark.YELLOW}
            size="$4"
            onPress={handleSigninForm}
          >
            <MyText>Sign In</MyText>
          </Button>
        </Form.Trigger>
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
          onPress={handleGoogleSignin}
        >
          <MyText color={"$textPrimary"}>Sign in with Google</MyText>
        </Button>
      </Form>
      {/* <ToastControl title={"Login"} message={"Failed"} /> */}
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
