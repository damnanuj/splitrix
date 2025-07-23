import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode as atob } from "base-64";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
interface AuthData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
  };
}

interface AuthState {
  authData: AuthData | null;
  isLoading: boolean;
  setAuth: (data: AuthData) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authData: null,
  isLoading: true,

  setAuth: async (data: any) => {
    const { token, user } = data;
    await AsyncStorage.setItem("authData", JSON.stringify(user));
    await AsyncStorage.setItem("TOKEN", JSON.stringify(token));

    set({ authData: user });
  },

  logout: async () => {
    try {
      const storedAuthData = await AsyncStorage.getItem("authData");
      const parsedAuthData = storedAuthData ? JSON.parse(storedAuthData) : null;

      // -------if user logged in via Google-------
      if (parsedAuthData?.provider === "google") {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem("authData");
        await AsyncStorage.removeItem("TOKEN");
      }

      // ------if normal local user-------
      await AsyncStorage.removeItem("authData");
      await AsyncStorage.removeItem("TOKEN");
      set({ authData: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  initializeAuth: async () => {
    try {
      const storedUser = await AsyncStorage.getItem("authData");
      const storedToken = await AsyncStorage.getItem("TOKEN");

      if (storedUser && storedToken) {
        const token = JSON.parse(storedToken);
        const user = JSON.parse(storedUser);

        if (!isTokenExpired(token)) {
          set({ authData: user });
        } else {
          await AsyncStorage.removeItem("authData");
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
