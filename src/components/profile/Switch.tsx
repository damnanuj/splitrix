// @ts-nocheck
import { Stack, styled } from "@tamagui/core";
import { createSwitch } from "@tamagui/switch";
import { useThemeController } from "src/context/theme-context";
import { Label, XStack, YStack } from "tamagui";

const Frame = styled(Stack, {
  width: 40,
  height: 20,
  borderRadius: 20,
  variants: {
    checked: {
      true: {
        backgroundColor: "#4AAE51",
      },
      false: {
        backgroundColor: "silver",
      },
    },
  } as const,
  defaultVariants: {
    checked: false,
  },
});

const Thumb = styled(Stack, {
  width: 20,
  height: 20,
  backgroundColor: "white",
  borderRadius: 20,

  variants: {
    checked: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0.5,
      },
    },
  } as const,
});

export const Switch = createSwitch({
  Frame,
  Thumb,
});

export function SwitchUnstyledDemo() {
  const { theme, toggleTheme } = useThemeController();
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      id="unstyled-switch"
    >
      <Switch.Thumb animation="quick" />
    </Switch>
  );
}
