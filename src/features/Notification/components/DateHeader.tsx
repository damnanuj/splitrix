import { scale } from "src/utils/functions/dimensions";
import { XStack, YStack } from "tamagui";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import Feather from "@expo/vector-icons/Feather";

interface DateHeaderProps {
  dateLabel: string;
  notificationCount: number;
}

export const DateHeader = ({
  dateLabel,
  notificationCount,
}: DateHeaderProps) => {
  const getDateIcon = (dateLabel: string) => {
    if (dateLabel === "Today") return "sun";
    if (dateLabel === "Yesterday") return "moon";
    return "calendar";
  };

  const getDateColor = (dateLabel: string) => {
    if (dateLabel === "Today") return "#f39c12";
    if (dateLabel === "Yesterday") return "#95a5a6";
    return "#7f8c8d";
  };

  return (
    <XStack
      items="center"
      justify="space-between"
      py={scale(12)}
      px={scale(4)}
      // mb={scale(8)}
      // mt={scale(16)}
    >
      <XStack items="center" gap={scale(8)}>
        <Feather
          name={getDateIcon(dateLabel) as any}
          size={scale(16)}
          color={getDateColor(dateLabel)}
        />
        <MyText
          color="$textSecondary"
          style={{ fontFamily: "MPlusRounded700" }}
          fontSize={scale(13)}
        >
          {dateLabel}
        </MyText>
      </XStack>

      <XStack
        bg="$blue3"
        px={scale(8)}
        py={scale(4)}
        rounded={scale(12)}
        items="center"
        gap={scale(4)}
      >
        <MyText
          color="$blue11"
          style={{ fontFamily: "MPlusRounded600" }}
          fontSize={scale(12)}
        >
          {notificationCount}
        </MyText>
        <MyText
          color="$blue10"
          style={{ fontFamily: "MPlusRounded400" }}
          fontSize={scale(11)}
        >
          {notificationCount === 1 ? "notification" : "notifications"}
        </MyText>
      </XStack>
    </XStack>
  );
};
