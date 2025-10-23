import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  isInitialized: boolean;
  setTheme: (theme: Theme) => Promise<void>;
  toggleTheme: () => Promise<void>;
  initializeTheme: () => Promise<void>;
}

const THEME_STORAGE_KEY = "APP_THEME";

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark", // Default theme
  isInitialized: false,

  setTheme: async (theme: Theme) => {
    try {
      // Update AsyncStorage
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);

      // Update store state
      set({ theme });
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  },

  toggleTheme: async () => {
    const currentTheme = get().theme;
    const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
    await get().setTheme(newTheme);
  },

  initializeTheme: async () => {
    try {
      // Get theme from AsyncStorage
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        set({ theme: storedTheme as Theme, isInitialized: true });
      } else {
        // First time user - set default theme and store it
        const defaultTheme: Theme = "dark";
        await AsyncStorage.setItem(THEME_STORAGE_KEY, defaultTheme);
        set({ theme: defaultTheme, isInitialized: true });
      }
    } catch (error) {
      console.error("Error initializing theme:", error);
      // Fallback to default theme
      set({ theme: "dark", isInitialized: true });
    }
  },
}));
