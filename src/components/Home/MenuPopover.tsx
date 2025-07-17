import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "@tamagui/lucide-icons";
import { useState } from "react";
import themeColors from "src/utils/theme/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import type { PopoverProps } from "tamagui";
import {
  Adapt,
  Button,
  Input,
  isWeb,
  Label,
  Popover,
  Sheet,
  Stack,
  styled,
  useTheme,
  XStack,
  YStack,
} from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";

export function PopoverDemo() {
  return (
    <XStack
      //  borderWidth={1}
      p={0}
      justify="center"
      items="center"
    >
      {/* <Demo placement="left" Icon={ChevronLeft} Name="left-popover" />
        <Demo placement="bottom" Icon={ChevronDown} Name="bottom-popover" /> */}
      <Demo placement="bottom" Icon={ChevronUp} Name="top-popover" />
      {/* <Demo placement="right" Icon={ChevronRight} Name="right-popover" /> */}
    </XStack>
  );
}

export function Demo({
  Icon,
  Name,
  shouldAdapt,
  ...props
}: PopoverProps & { Icon?: any; Name?: string; shouldAdapt?: boolean }) {
  const theme = useTheme();
  return (
    <Popover size="$5" allowFlip stayInFrame offset={15} resize {...props}>
      <Popover.Trigger asChild>
        {/* <MaterialCommunityIcons name="dots-vertical" size={40} color={"red"} /> */}
        <Stack>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color={theme.textPrimary.val}
          />
        </Stack>
      </Popover.Trigger>

      {shouldAdapt && (
        <Adapt when="maxMd" platform="touch">
          <Sheet animation="medium" modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              backgroundColor="$shadowColor"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
      )}

      <Popover.Content
        borderWidth={1}
        borderColor={"$borderPrimary"}
        width={150}
        p={scale(20)}
        // height={200}
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderPrimary" />

        <YStack width={"100%"} gap={scale(5)}>
          <Button
            borderWidth={0}
            rounded={scale(5)}
            bg={"$backgroundSecondary"}
            borderColor={"white"}
            justify={"center"}
            px={0}
            height={scale(35)}
          >
            <MyText fontSize={scale(11)}>Edit</MyText>
          </Button>

          <Button
            borderWidth={0}
            rounded={scale(5)}
            bg={"$backgroundSecondary"}
            borderColor={"white"}
            justify={"center"}
            height={scale(35)}
          >
            <MyText fontSize={scale(11)}>Delete</MyText>
          </Button>
          <Button
            borderWidth={0}
            rounded={scale(5)}
            bg={"$backgroundSecondary"}
            borderColor={"white"}
            justify={"center"}
            height={scale(35)}
          >
            <MyText fontSize={scale(11)}>Show Details</MyText>
          </Button>

          <Popover.Close asChild>
            {/* <Button
              size="$3"
              onPress={() => {
               
              }}
            >
              Submit
            </Button> */}
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
