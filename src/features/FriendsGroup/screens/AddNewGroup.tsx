import { useCallback, useEffect, useMemo, useState } from "react";
import {
  YStack,
  XStack,
  Input,
  Button,
  Avatar,
  ScrollView,
  Stack,
  Square,
  Spinner,
} from "tamagui";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { useCreateGroup } from "src/hooks/group/useCreateGroup";
import { useFriendsList } from "src/hooks/friends/useFriendsList";
import { useAuthStore } from "src/stores/authStore";
import { ModalSheet } from "src/components/common/ModalSheet";
import { Plus, X as CloseIcon, Check } from "@tamagui/lucide-icons";
import { Pressable } from "react-native";

interface DisplayMember {
  _id: string;
  name: string;
  email?: string;
  profilePicture?: string;
  isCurrentUser?: boolean;
}

const AddNewGroup = () => {
  const router = useRouter();
  const { authData } = useAuthStore();
  const currentUserId = authData?._id;
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [memberSheetOpen, setMemberSheetOpen] = useState(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(() =>
    currentUserId ? [currentUserId] : []
  );
  const toast = useToastController();
  const { data: friends = [], isLoading: isFriendsLoading } = useFriendsList();
  const createGroupMutation = useCreateGroup();

  useEffect(() => {
    if (currentUserId) {
      setSelectedMemberIds((prev) => {
        if (prev.includes(currentUserId)) return prev;
        return [currentUserId, ...prev];
      });
    }
  }, [currentUserId]);

  const handleToggleMember = useCallback(
    (memberId: string) => {
      if (currentUserId === memberId) return;
      setSelectedMemberIds((prev) => {
        if (prev.includes(memberId)) {
          return prev.filter((id) => id !== memberId);
        }
        return [...prev, memberId];
      });
    },
    [currentUserId]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      if (currentUserId === memberId) return;
      setSelectedMemberIds((prev) => prev.filter((id) => id !== memberId));
    },
    [currentUserId]
  );

  const availableFriends = useMemo(
    () => friends.filter((friend) => friend._id !== currentUserId),
    [friends, currentUserId]
  );

  const selectedMembers = useMemo<DisplayMember[]>(() => {
    const mapped: DisplayMember[] = [];

    selectedMemberIds.forEach((id) => {
      if (authData && id === currentUserId) {
        mapped.push({
          _id: currentUserId,
          name: authData.name || "You",
          email: authData.email,
          profilePicture: authData.profilePicture,
          isCurrentUser: true,
        });
        return;
      }

      const friend = friends.find((item) => item._id === id);
      if (friend) {
        mapped.push({
          _id: friend._id,
          name: friend.name || "Member",
          email: friend.email,
          profilePicture: friend.profilePicture,
        });
      }
    });

    return mapped;
  }, [selectedMemberIds, friends, authData, currentUserId]);

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
          toast.show(res?.msg || "Group created successfully", {
            message: trimmedDescription || undefined,
          });
          setGroupName("");
          setDescription("");
          router.back();
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
  const hasAdditionalMembers = selectedMembers.length > 1;

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

      <YStack gap={scale(10)}>
        <MyText color="$textPrimary" fontSize={scale(16)}>
          Members (optional)
        </MyText>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack
            gap={scale(12)}
            py={scale(4)}
            pr={scale(10)}
            borderColor={"red"}
            // borderWidth={1}
          >
            {selectedMembers.map((member) => {
              const avatarSource =
                member.profilePicture ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  member.name || "Member"
                )}&background=2f3640&color=ffffff`;

              return (
                <Stack
                  key={member._id}
                  items="center"
                  gap={scale(6)}
                  borderColor={"green"}
                  // pt={scale(5)}
                  // borderWidth={1}
                  p={scale(2)}
                >
                  <Stack position="relative">
                    <Avatar size={scale(54)} rounded={scale(12)}>
                      <Avatar.Image
                        accessibilityLabel={member.name}
                        src={avatarSource}
                      />
                      <Avatar.Fallback delayMs={600} backgroundColor="#444" />
                    </Avatar>

                    {!member.isCurrentUser && (
                      <Stack
                        style={{
                          position: "absolute",
                          top: -scale(6),
                          right: -scale(6),
                        }}
                      >
                        <Pressable
                          onPress={() => handleRemoveMember(member._id)}
                        >
                          <Square
                            size={scale(24)}
                            rounded={scale(12)}
                            bg="$backgroundSecondary"
                            // borderWidth={1}
                            borderColor="$borderPrimary"
                            items="center"
                            justify="center"
                            shadowColor="$textPrimary"
                            shadowOffset={{ width: 0, height: 1 }}
                            shadowOpacity={0.2}
                            shadowRadius={2}
                            elevation={3}
                          >
                            <CloseIcon size={scale(12)} color="$textPrimary" />
                          </Square>
                        </Pressable>
                      </Stack>
                    )}
                  </Stack>
                  <MyText
                    color="$textSecondary"
                    fontSize={scale(12)}
                    numberOfLines={1}
                    style={{ textAlign: "center", maxWidth: scale(70) }}
                  >
                    {member.isCurrentUser ? "You" : member.name}
                  </MyText>
                </Stack>
              );
            })}

            <Pressable
              onPress={() => setMemberSheetOpen(true)}
              style={{ padding: scale(2) }}
            >
              <Square
                size={scale(54)}
                rounded={scale(12)}
                borderWidth={1}
                borderStyle="dashed"
                borderColor="$textSecondary"
                bg="$backgroundSecondary"
                items="center"
                justify="center"
              >
                <Plus size={scale(20)} color="$textSecondary" />
              </Square>
            </Pressable>
          </XStack>
        </ScrollView>

        {hasAdditionalMembers && (
          <MyText color="$textSecondary" fontSize={scale(13)} px={scale(2)}>
            {selectedMembers.length} people (including you) will be part of this
            group.
          </MyText>
        )}
      </YStack>

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

      <ModalSheet
        open={memberSheetOpen}
        onOpenChange={setMemberSheetOpen}
        snapPoints={[70]}
      >
        <YStack gap={scale(10)}>
          <XStack items="center" justify="space-between">
            <MyText color="$textPrimary" fontSize={scale(18)} fontWeight="600">
              Select members
            </MyText>
            <Button
              size="$2"
              rounded={scale(20)}
              bg="$backgroundSecondary"
              color="$textSecondary"
              onPress={() => setMemberSheetOpen(false)}
            >
              Done
            </Button>
          </XStack>

          {isFriendsLoading ? (
            <YStack
              items="center"
              justify="center"
              py={scale(40)}
              gap={scale(12)}
            >
              <Spinner size="small" color="$textSecondary" />
              <MyText color="$textSecondary">Loading friends...</MyText>
            </YStack>
          ) : availableFriends.length === 0 ? (
            <YStack
              items="center"
              justify="center"
              py={scale(40)}
              gap={scale(8)}
            >
              <MyText color="$textSecondary" fontSize={scale(14)}>
                You don't have any friends to add yet.
              </MyText>
              <MyText
                color="$textSecondary"
                fontSize={scale(12)}
                style={{ textAlign: "center" }}
              >
                Once you add friends, you'll be able to include them here.
              </MyText>
            </YStack>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <YStack gap={scale(12)} pb={scale(40)}>
                {availableFriends.map((friend) => {
                  const isSelected = selectedMemberIds.includes(friend._id);
                  const avatarSource =
                    friend.profilePicture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      friend.name || "Member"
                    )}&background=2f3640&color=ffffff`;

                  return (
                    <Pressable
                      key={friend._id}
                      onPress={() => handleToggleMember(friend._id)}
                    >
                      <XStack
                        gap={scale(16)}
                        items="center"
                        p={scale(12)}
                        borderWidth={1}
                        borderColor={
                          isSelected ? "$accentYellow" : "$backgroundSecondary"
                        }
                        bg="$backgroundSecondary"
                        rounded={scale(12)}
                      >
                        <Avatar size={scale(48)} rounded={scale(12)}>
                          <Avatar.Image
                            accessibilityLabel={friend.name}
                            src={avatarSource}
                          />
                          <Avatar.Fallback
                            delayMs={600}
                            backgroundColor="#444"
                          />
                        </Avatar>

                        <YStack flex={1} gap={scale(4)}>
                          <MyText
                            color="$textPrimary"
                            fontSize={scale(15)}
                            fontWeight="600"
                          >
                            {friend.name}
                          </MyText>
                          <MyText color="$textSecondary" fontSize={scale(13)}>
                            {friend.email}
                          </MyText>
                        </YStack>

                        <Square
                          size={scale(24)}
                          rounded={scale(8)}
                          borderWidth={1}
                          borderColor={
                            isSelected ? "$accentYellow" : "$borderPrimary"
                          }
                          bg={isSelected ? "$accentYellow" : "transparent"}
                          items="center"
                          justify="center"
                        >
                          {isSelected && (
                            <Check size={scale(16)} color="$accentBlack" />
                          )}
                        </Square>
                      </XStack>
                    </Pressable>
                  );
                })}
              </YStack>
            </ScrollView>
          )}
        </YStack>
      </ModalSheet>
    </YStack>
  );
};

export default AddNewGroup;
