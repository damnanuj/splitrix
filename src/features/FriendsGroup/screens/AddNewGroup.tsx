import { useState } from "react";
import { YStack, XStack, Input, Button } from "tamagui";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";

const AddNewGroup = () => {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToastController();

  return (
    <YStack bg="$background" flex={1} px={scale(25)} gap={scale(20)}>
      <BackButtonWithHeader title="Add New Group" />

      <YStack gap={scale(20)}>
        <YStack gap={scale(10)}>
          <MyText color="$textPrimary" fontSize={scale(16)}>
            Group Name *
          </MyText>
          <Input
            placeholder="Enter group name"
            value={groupName}
            onChangeText={setGroupName}
            borderColor="$backgroundSecondary"
            bg="$backgroundSecondary"
            color="$textPrimary"
            fontSize={scale(16)}
            p={scale(15)}
            rounded={scale(10)}
          />
        </YStack>

        <YStack gap={scale(10)}>
          <MyText color="$textPrimary" fontSize={scale(16)}>
            Description
          </MyText>
          <Input
            placeholder="Enter group description (optional)"
            value={description}
            onChangeText={setDescription}
            borderColor="$backgroundSecondary"
            bg="$backgroundSecondary"
            color="$textPrimary"
            fontSize={scale(16)}
            p={scale(15)}
            rounded={scale(10)}
            multiline
            numberOfLines={3}
          />
        </YStack>
      </YStack>

      <YStack gap={scale(15)} mt={scale(20)}>
        <Button
          onPress={() => {}}
          bg="$accentYellow"
          color="$textPrimary"
          fontSize={scale(16)}
          fontWeight="600"
          p={scale(15)}
          rounded={scale(10)}
          // disabled={!groupName.trim() || createGroupMutation.isPending}
          // opacity={!groupName.trim() || createGroupMutation.isPending ? 0.6 : 1}
        >
          {/* {createGroupMutation.isPending ? "Creating..." : "Create Group"} */}
          Create Group
        </Button>

        <Button
          onPress={() => router.back()}
          bg="$backgroundSecondary"
          color="$textSecondary"
          fontSize={scale(16)}
          p={scale(15)}
          rounded={scale(10)}
          // disabled={createGroupMutation.isPending}
        >
          Cancel
        </Button>
      </YStack>
    </YStack>
  );
};

export default AddNewGroup;
