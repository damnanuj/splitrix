import { Sheet } from "@tamagui/sheet";
import React from "react";
import { YStack } from "tamagui";
import type { SizeTokens } from "@tamagui/core";

type SnapPointsMode = "percent" | "constant" | "fit" | "mixed";

interface ModalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  // Sheet configuration
  snapPoints?: (number | string)[];
  snapPointsMode?: SnapPointsMode;
  dismissOnSnapToBottom?: boolean;
  modal?: boolean;
  // Animation
  animation?: "quick" | "medium" | "slow" | "bouncy" | "lazy";
  // Styling
  padding?: SizeTokens;
  gap?: SizeTokens;
  // Overlay
  overlayBg?: any;
  overlayAnimation?: "quick" | "medium" | "slow" | "bouncy" | "lazy";
  // Handle
  showHandle?: boolean;
  // Z-index
  zIndex?: number;
}

export const ModalSheet = ({
  open,
  onOpenChange,
  children,
  // Default values with fallbacks
  snapPoints = [85],
  snapPointsMode = "percent",
  dismissOnSnapToBottom = true,
  modal = true,
  animation = "medium",
  padding = "$4",
  gap = "$4",
  overlayBg = "$shadow6",
  overlayAnimation = "lazy",
  showHandle = true,
  zIndex = 100_000,
}: ModalSheetProps) => {
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={modal}
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      snapPointsMode={snapPointsMode}
      dismissOnSnapToBottom={dismissOnSnapToBottom}
      zIndex={zIndex}
      animation={animation}
    >
      <Sheet.Overlay
        animation={overlayAnimation}
        bg={overlayBg}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      {showHandle && <Sheet.Handle />}
      <Sheet.Frame p={padding}>
        <YStack gap={gap} borderColor="green" flex={1}>
          {children}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};
