import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode as atob } from "base-64";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { User } from "./types";

interface AuthState {
  authData: User | null;
  isLoading: boolean;
  setAuth: (data: { token: string; user: User }) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authData: null,
  isLoading: true,

  setAuth: async (data: { token: string; user: User }) => {
    const { token, user } = data;
    
    // Store token and user data separately
    await AsyncStorage.setItem("TOKEN", JSON.stringify(token));
    await AsyncStorage.setItem("USER_DATA", JSON.stringify(user));

    // Store user object directly in authData
    set({ authData: user });
  },

  logout: async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("USER_DATA");
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

      // -------if user logged in via Google-------
      if (parsedUserData?.provider === "google") {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }

      // ------clear all auth data-------
      await AsyncStorage.removeItem("USER_DATA");
      await AsyncStorage.removeItem("TOKEN");
      set({ authData: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  initializeAuth: async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("USER_DATA");
      const storedToken = await AsyncStorage.getItem("TOKEN");

      if (storedUserData && storedToken) {
        const token = JSON.parse(storedToken);
        const user = JSON.parse(storedUserData);

        if (!isTokenExpired(token)) {
          set({ authData: user });
        } else {
          await AsyncStorage.removeItem("USER_DATA");
          await AsyncStorage.removeItem("TOKEN");
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() > payload.exp * 1000;
  } catch {
    return true;
  }
}
