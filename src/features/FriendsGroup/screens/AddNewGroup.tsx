import { useCallback, useState, useEffect, useMemo } from "react";
import { YStack, XStack, Input, Button, Spinner } from "tamagui";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { useCreateGroup } from "src/hooks/group/useCreateGroup";
import { useAuthStore } from "src/stores/authStore";
import MemberSelector from "src/components/common/MemberSelector";
import { useFriendsList } from "src/hooks/friends/useFriendsList";

const AddNewGroup = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    selectedFriendId?: string;
    selectedFriendIds?: string;
  }>();
  const { authData } = useAuthStore();
  const currentUserId = authData?._id;
  const { data: friends = [] } = useFriendsList();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(() =>
    currentUserId ? [currentUserId] : []
  );
  const toast = useToastController();
  const createGroupMutation = useCreateGroup();

  // Handle initial friend selection from route params
  // Support both selectedFriendId (single) and selectedFriendIds (comma-separated)
  useEffect(() => {
    if (currentUserId) {
      const friendIdsParam =
        params.selectedFriendIds || params.selectedFriendId;
      if (friendIdsParam) {
        // Parse comma-separated string or use single ID
        const friendIds = friendIdsParam.includes(",")
          ? friendIdsParam.split(",").filter(Boolean)
          : [friendIdsParam];

        setSelectedMemberIds((prev) => {
          const newIds = [currentUserId, ...friendIds];
          // Remove duplicates
          return Array.from(new Set(newIds));
        });
      }
    }
  }, [params.selectedFriendId, params.selectedFriendIds, currentUserId]);

  // Auto-fill group name if only one friend is selected (excluding current user)
  // Only auto-fill when coming from selector (params.selectedFriendId exists) and name is empty
  const selectedFriends = useMemo(() => {
    return friends.filter((friend) => selectedMemberIds.includes(friend._id));
  }, [selectedMemberIds, friends]);

  useEffect(() => {
    // Only auto-fill if:
    // 1. We came from the selector (params.selectedFriendIds or selectedFriendId exists)
    // 2. Only one friend is selected (excluding current user)
    // 3. Group name is currently empty
    const hasFriendParams = params.selectedFriendIds || params.selectedFriendId;
    if (
      hasFriendParams &&
      selectedFriends.length === 1 &&
      authData?.name &&
      !groupName.trim()
    ) {
      const friendName = selectedFriends[0].name;
      const autoFillName = `${authData.name} | ${friendName}`;
      setGroupName(autoFillName);
    }
  }, [
    params.selectedFriendId,
    params.selectedFriendIds,
    selectedFriends,
    authData?.name,
    groupName,
  ]);

  const handleCreateGroup = useCallback(() => {
    const trimmedName = groupName.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName.length) {
      toast.show("Group name is required", {
        message: "Please enter a name for the group.",
      });
      return;
    }

    const memberIds = Array.from(
      new Set(
        selectedMemberIds.length
          ? selectedMemberIds
          : currentUserId
          ? [currentUserId]
          : []
      )
    );

    if (!memberIds.length && currentUserId) {
      memberIds.push(currentUserId);
    }

    createGroupMutation.mutate(
      {
        name: trimmedName,
        description: trimmedDescription,
        memberIds,
      },
      {
        onSuccess: (res) => {
          const createdGroupId = res?.data?._id;
          toast.show(res?.msg || "Group created successfully", {
            message: trimmedDescription || undefined,
          });
          setGroupName("");
          setDescription("");
          if (createdGroupId) {
            router.replace({
              pathname: "/createGroupExpense",
              params: { groupId: createdGroupId },
            });
            return;
          }
          router.replace("/splitTargetSelection");
        },
        onError: (error) => {
          toast.show("Failed to create group", {
            message:
              error?.message || "Something went wrong. Please try again.",
          });
        },
      }
    );
  }, [
    groupName,
    description,
    selectedMemberIds,
    currentUserId,
    createGroupMutation,
    router,
    toast,
  ]);

  const isCreating = createGroupMutation.isPending;
  const canCreate = groupName.trim().length > 0 && !isCreating;

  return (
    <YStack
      bg="$background"
      flex={1}
      px={scale(25)}
      py={scale(10)}
      gap={scale(20)}
    >
      <BackButtonWithHeader title="Add New Group" />

      <YStack gap={scale(20)}>
        <YStack gap={scale(10)}>
          <MyText color="$textPrimary" fontSize={scale(16)}>
            Group Name *
          </MyText>
          <Input
            placeholder="Enter group name"
            placeholderTextColor="$textSecondary"
            value={groupName}
            onChangeText={setGroupName}
            borderColor="$backgroundSecondary"
            bg="$backgroundSecondary"
            color="$textPrimary"
            fontSize={scale(16)}
            px={scale(16)}
            py={scale(16)}
            height={scale(50)}
            rounded={scale(12)}
            borderWidth={1}
          />
        </YStack>

        <YStack gap={scale(10)}>
          <MyText color="$textPrimary" fontSize={scale(16)}>
            Description
          </MyText>
          <Input
            placeholder="Enter group description (optional)"
            placeholderTextColor="$textSecondary"
            value={description}
            onChangeText={setDescription}
            borderColor="$backgroundSecondary"
            bg="$backgroundSecondary"
            color="$textPrimary"
            fontSize={scale(16)}
            px={scale(16)}
            py={scale(16)}
            height={scale(100)}
            rounded={scale(12)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            borderWidth={1}
          />
        </YStack>
      </YStack>

      <MyText color="$textPrimary" fontSize={scale(16)}>
        Members (optional)
      </MyText>

      <MemberSelector
        selectedMemberIds={selectedMemberIds}
        onSelectionChange={setSelectedMemberIds}
        helperText={(count) =>
          `${count} people (including you) will be part of this group.`
        }
      />

      <YStack gap={scale(15)} mb={scale(20)}>
        <Button
          onPress={handleCreateGroup}
          bg="$accentYellow"
          color="$accentBlack"
          fontSize={scale(16)}
          fontWeight="600"
          height={scale(52)}
          rounded={scale(12)}
          disabled={!canCreate}
          opacity={!canCreate ? 0.6 : 1}
          pressStyle={{ opacity: 0.8 }}
        >
          {isCreating ? (
            <XStack items="center" gap={scale(10)}>
              <Spinner size="small" color="$accentBlack" />
              <MyText
                color="$accentBlack"
                fontSize={scale(16)}
                fontWeight="600"
              >
                Creating...
              </MyText>
            </XStack>
          ) : (
            <MyText color="$accentBlack" fontSize={scale(16)} fontWeight="600">
              Create Group
            </MyText>
          )}
        </Button>

        <Button
          onPress={() => router.back()}
          bg="$backgroundSecondary"
          color="$textPrimary"
          fontSize={scale(16)}
          height={scale(52)}
          rounded={scale(12)}
          disabled={isCreating}
          opacity={isCreating ? 0.6 : 1}
          pressStyle={{ opacity: 0.8 }}
          borderWidth={1}
          borderColor="$borderPrimary"
        >
          <MyText color="$textPrimary" fontSize={scale(16)}>
            Cancel
          </MyText>
        </Button>
      </YStack>
    </YStack>
  );
};

export default AddNewGroup;
