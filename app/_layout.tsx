import "../tamagui-web.css";

import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import Provider from "./Provider";
import { useTheme } from "tamagui";
import {
  ThemeProviderCustom,
  useThemeController,
} from "src/context/theme-context";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { ENV } from "src/utils/constants/env";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "src/stores/authStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [interLoaded, interError] = useFonts({
  //   Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
  //   InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  //   NeonRegular: require("../assets/fonts/SpaceMono-Regular.ttf"),
  // });

  // useEffect(() => {
  //   if (interLoaded || interError) {
  //     // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
  //     SplashScreen.hideAsync();
  //   }
  // }, [interLoaded, interError]);

  // if (!interLoaded && !interError) {
  //   return null;
  // }

  // console.log(ENV.GOOGLE_WEB_CLIENT_ID, "sfsds");

  GoogleSignin.configure({
    webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
    scopes: ["profile", "email"], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false,
    // iosClientId: process.env.EXPO_PUBLIC_IOS_ID,
  });

  const [fontsLoaded] = useFonts({
    Sparkle: require("../assets/fonts/Sparkle.ttf"),
  
    NeoNeon: require("../assets/fonts/NeoNeon.otf"),



  
    MPlusRounded400: require("../assets/fonts/MPLUSRounded/MPLUSRounded1c-Regular.ttf"),
    MPlusRounded500: require("../assets/fonts/MPLUSRounded/MPLUSRounded1c-Medium.ttf"),
    MPlusRounded700: require("../assets/fonts/MPLUSRounded/MPLUSRounded1c-Bold.ttf"),
    MPlusRounded800: require("../assets/fonts/MPLUSRounded/MPLUSRounded1c-ExtraBold.ttf"),
    // key = exact name to use in fontFamily
  });

  useEffect(() => {
    // console.log("Fonts loaded?", fontsLoaded);
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}
const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProviderCustom>
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </ThemeProviderCustom>
  );
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { theme } = useThemeController();
  const router = useRouter();
  // isLoading is true initially, while we check for a stored token
  const { authData, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Check for a stored auth token when the app loads
    initializeAuth();
  }, []);

  useEffect(() => {
    // This effect will run whenever isLoading or authData changes
    if (isLoading) {
      return; // Do nothing while we're still loading
    }

    if (authData) {
      // User is signed in, go to the main app
      router.replace("/(tabs)/home");
    } else {
      // User is not signed in, go to the login screen
      router.replace("/");
    }
  }, [isLoading, authData, router]);

  // While isLoading is true, return null. The splash screen will remain visible.
  if (isLoading) {
    return null;
  }

  // Once loading is complete, render the navigator. The useEffect above will
  // have already triggered the correct navigation route.
  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ animation: "simple_push" }} />
        <Stack.Screen name="index" options={{ animation: "simple_push" }} />
        <Stack.Screen name="notification" />
      </Stack>
    </ThemeProvider>
  );
}
