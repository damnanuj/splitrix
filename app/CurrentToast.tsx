import { Toast, useToastController, useToastState } from "@tamagui/toast";
import { Dimensions } from "react-native";
import { scale } from "src/utils/functions/dimensions";
import { Button, H4, XStack, YStack, isWeb } from "tamagui";

export function CurrentToast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  const { width } = Dimensions.get("window");

  return (
    <Toast
      key={currentToast.id}
      duration={800}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? "$12" : 0}
      width={scale(width - 30)}
      theme="accent"
      rounded="$6"
      animation="quick"
    >
      <YStack
        items="center"
        p="$2"
        gap="$2"
        borderWidth={1}
        borderColor={"red"}
        width={"100%"}
      >
        <Toast.Title fontWeight="bold">{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
}

export default function ToastControl({
  success = true,
  title = "add title prop",
  message = "add message prop",
}) {
  const toast = useToastController();

  return (
    <YStack gap="$2" items="center">
      <H4>Toast demo</H4>
      <XStack gap="$2" borderWidth={1} borderColor={"red"} justify="center">
        <Button
          onPress={() => {
            toast.show(title, {
              message,
            });
          }}
        >
          Show
        </Button>
        <Button
          onPress={() => {
            toast.hide();
          }}
        >
          Hide
        </Button>
      </XStack>
    </YStack>
  );
}
