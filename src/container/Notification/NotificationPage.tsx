import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { ScrollView, Stack, useTheme, XStack, YStack } from "tamagui";
import Feather from "@expo/vector-icons/Feather";
import { formatDate } from "src/utils/functions/formatDate";
import { NotificationItem } from "src/components/notification/NotificationItem";
import { expenses } from "./notificationDummyData";
import ExpensesHistory from "./ExpensesHistory";


const NotificationPage = () => {
  return (
    <YStack px={scale(25)} flex={1} bg={"$background"}>
      <BackButtonWithHeader title="Notifications" />
      <ExpensesHistory />
    </YStack>
  );
};

export default NotificationPage;
