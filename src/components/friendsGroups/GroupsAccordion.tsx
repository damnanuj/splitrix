import { ChevronDown } from "@tamagui/lucide-icons";
import { scale } from "src/utils/functions/dimensions";
import { Accordion, Paragraph, Square, Stack, XStack, YStack } from "tamagui";
import Feather from "@expo/vector-icons/Feather";
import MyText from "../customTabBars/styleComponents/MyText";

export function AccordionDemo({ icon, title, amount, time, iconColor }: any) {
  return (
    <Accordion overflow="hidden" width="100%" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger
          flexDirection="row"
          px={0}
          //   borderWidth={1}
          //   borderColor={"red"}
          justify="space-between"
        >
          {({ open }: { open: boolean }) => (
            <>
              <XStack
                gap={scale(20)}
                items={"center"}
                // borderWidth={1}
                borderColor={"red"}
              >
                <Stack
                  bg={"$backgroundSecondary"}
                  width={55}
                  height={55}
                  rounded={scale(10)}
                  justify="center"
                  items="center"
                >
                  <Feather name={icon} size={25} color={iconColor} />
                </Stack>

                <MyText
                  color={"$textPrimary"}
                  fontSize={scale(16)}
                  style={{ fontFamily: "MPlusRounded700" }}
                >
                  {title}
                </MyText>
              </XStack>
              <Square animation="quick" rotate={open ? "-180deg" : "-90deg"}>
                <ChevronDown size="$1" />
              </Square>
            </>
          )}
        </Accordion.Trigger>
        <Accordion.HeightAnimator animation="medium">
          <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
            <Paragraph>
              Cold showers can help reduce inflammation, relieve pain, improve
              circulation, lower stress levels, and reduce muscle soreness and
              fatigue.
            </Paragraph>
          </Accordion.Content>
        </Accordion.HeightAnimator>
      </Accordion.Item>
    </Accordion>
  );
}
