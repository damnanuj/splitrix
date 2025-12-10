import { defaultConfig } from "@tamagui/config/v4";
import themeColors from "./src/utils/theme/colors";
import { createTamagui } from "tamagui";

const config = createTamagui({
  ...defaultConfig,

  themes: {
    ...defaultConfig.themes,

    dark: {
      ...defaultConfig.themes?.dark,
      background: themeColors.dark.PRIMARY,
      backgroundSecondary: themeColors.dark.SECONDARY,
      textPrimary: themeColors.dark.TEXT_PRIMARY,
      textSecondary: themeColors.dark.TEXT_SECONDARY,
      accentYellow: themeColors.dark.YELLOW,
      accentYellowPressed: themeColors.dark.YELLOW_PRESSED,
      accentWhite: themeColors.dark.WHITE,
      accentBlack: themeColors.dark.BLACK,
      accentGreen: themeColors.dark.GREEN,
      borderPrimary: themeColors.dark.BORDER_PRIMARY,
      shimmerPrimary: themeColors.dark.SHIMMER_PRIMARY,
      shimmerSecondary: themeColors.dark.SHIMMER_SECONDARY,
      accentRed: themeColors.dark.RED,
    },

    light: {
      ...defaultConfig.themes?.light,
      background: themeColors.light.PRIMARY,
      backgroundSecondary: themeColors.light.SECONDARY,
      textPrimary: themeColors.light.TEXT_PRIMARY,
      textSecondary: themeColors.light.TEXT_SECONDARY,
      accentYellow: themeColors.light.YELLOW,
      accentYellowPressed: themeColors.light.YELLOW_PRESSED,
      accentWhite: themeColors.light.WHITE,
      accentBlack: themeColors.light.BLACK,
      accentGreen: themeColors.dark.GREEN,
      borderPrimary: themeColors.light.BORDER_PRIMARY,
      shimmerPrimary: themeColors.light.SHIMMER_PRIMARY,
      shimmerSecondary: themeColors.light.SHIMMER_SECONDARY,
      accentRed: themeColors.light.RED,
    },
  },
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
