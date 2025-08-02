import { ChevronDown } from "@tamagui/lucide-icons";
import { Accordion, Paragraph, Square } from "tamagui";

export function AccordionDemo({ icon, title, amount, time, iconColor }: any) {
  return (
    <Accordion overflow="hidden" width="100%" type="multiple">
      <Accordion.Item value="a1">
        <Accordion.Trigger flexDirection="row" justify="space-between">
          {({ open }: { open: boolean }) => (
            <>
              <Paragraph>{title}</Paragraph>
              <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
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
