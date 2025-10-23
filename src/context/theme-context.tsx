import { createContext, useContext, useEffect } from "react";
import { useThemeStore } from "src/stores/themeStore";

const ThemeContext = createContext({
  theme: "dark" as "light" | "dark",
  setTheme: (_: "light" | "dark") => {},
  toggleTheme: () => {},
  isInitialized: false,
});

export const ThemeProviderCustom = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme, setTheme, toggleTheme, isInitialized, initializeTheme } =
    useThemeStore();

  // Initialize theme on app start
  useEffect(() => {
    if (!isInitialized) {
      initializeTheme();
    }
  }, [isInitialized, initializeTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, isInitialized }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeController = () => useContext(ThemeContext);
