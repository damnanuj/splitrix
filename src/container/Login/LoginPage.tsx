import { useState } from "react";
import {
  Button,
  Input,
  YStack,
  XStack,
  Stack,
  Checkbox,
  CheckboxProps,
  Image,
  useTheme,
  Form,
} from "tamagui";
import { router, useRouter } from "expo-router";
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
import { googleLoginService, loginService } from "src/api/queryFunctions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "src/stores/authStore";
import { Spinner } from "tamagui";
import { useToastController } from "@tamagui/toast";

const LoginPage = () => {
  // console.log("LoginPage render");

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
            style={{ fontFamily: "NeoNeon" }}
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
  const [googleLoading, setGoogleLoading] = useState(false);
  const toast = useToastController();
  const handleGoogleSignin = async () => {
    try {
      setGoogleLoading(true);

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { user } = response.data;
        const { name, photo, email } = user;

        const data = await googleLoginService({ email, name, photo });
        console.log(data, "<<<<");

        if (data.success) {
          await setAuth({
            token: data.token,
            user: { provider: "google", ...data.user },
          });
          toast.show("Login Successful", {
            message: "You have been signed in with Google.",
          });
        } else {
          toast.show("Google Sign-In Failed", {
            message:
              data.message || "Something went wrong during Google login.",
          });
        }
      }
    } catch (error) {
      console.log(error || "error while google login");
    } finally {
      setGoogleLoading(false); // stop loading
    }
  };

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (name: string, value: string) => {
    const updatedForm = {
      ...signInForm,
      [name]: value,
    };

    setSignInForm(updatedForm);

    // Real-time validation only *after first submit*
    if (hasSubmitted) {
      validateForm(updatedForm);
    }
  };

  const validateForm = (formData = signInForm) => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const setAuth = useAuthStore((state) => state.setAuth);
  const mutation = useMutation({
    mutationFn: loginService,
    onSuccess: async (data) => {
      if (data.success) {
        await setAuth({
          token: data.token,
          user: { provider: "local", ...data.user },
        });
      } else {
        toast.show("Sign-In Failed", {
          message:
            data.message || "The email or passoword you entered is incorrect",
        });
      }
    },
  });
  return (
    <>
      <Form
        mt={scale(60)}
        width="100%"
        items="center"
        // borderWidth={1}
        borderColor={"red"}
        // onSubmit={() => handleSigninForm}
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
            borderColor={errors.email ? "red" : "$borderPrimary"}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
          {errors.email && <MyText color={"red"}>{errors.email}</MyText>}
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
            borderColor={errors.password ? "red" : "$borderPrimary"}
            style={{
              fontFamily: "MPlusRounded500",
              fontSize: scale(14),
              color: theme.textPrimary.val,
            }}
          />
          {errors.password && <MyText color={"red"}>{errors.password}</MyText>}
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
            onPress={() => {
              const isValid = validateForm();
              setHasSubmitted(true);

              if (isValid) {
                mutation.mutate(signInForm);
              }
            }}
            disabled={mutation.isPending}
            opacity={mutation.isPending ? 0.7 : 1}
          >
            <MyText color={"$textPrimary"}>
              {mutation.isPending ? "Signing in..." : "Sign In"}
            </MyText>

            {mutation.isPending && <Spinner size="small" color="$white1" />}
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
          bg="transparent"
          icon={<GoogleIcon size={30} />}
          onPress={handleGoogleSignin}
          disabled={googleLoading}
          opacity={googleLoading ? 0.7 : 1}
        >
          <MyText color={"$textPrimary"}>
            {googleLoading ? "Signing in with Google" : "Sign in with Google"}
          </MyText>

          {googleLoading && <Spinner size="small" color="$white1" />}
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
