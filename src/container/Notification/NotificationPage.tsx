import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import { scale } from "src/utils/functions/dimensions";
import { YStack } from "tamagui";

const NotificationPage = () => {
  return (
    <YStack px={scale(25)} flex={1} bg={"$background"}>
      <BackButtonWithHeader title="Notifications" />
    </YStack>
  );
};

export default NotificationPage;
