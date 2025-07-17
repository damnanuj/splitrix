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
import { SplashScreen, Stack } from "expo-router";
import Provider from "./Provider";
import { useTheme } from "tamagui";
import {
  ThemeProviderCustom,
  useThemeController,
} from "src/context/theme-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
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

  const [fontsLoaded] = useFonts({
    Sparkle: require("../assets/fonts/Sparkle.ttf"),
    SparkleFilled: require("../assets/fonts/SparkleFilled.ttf"),
    Neon: require("../assets/fonts/neon2.ttf"),
    NeoNeon: require("../assets/fonts/NeoNeon.otf"),
    MPlusRounded300: require("../assets/fonts/MPLUSRounded/MPLUSRounded1c-Light.ttf"),
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

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProviderCustom>
      <Provider>{children}</Provider>
    </ThemeProviderCustom>
  );
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  console.log(colorScheme, "colorScheme");
  const { theme } = useThemeController();

  // const theme = useTheme();
  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notification"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
