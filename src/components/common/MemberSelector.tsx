import { useState, useMemo, useEffect } from "react";
import { Pressable, ScrollView } from "react-native";
import {
  YStack,
  XStack,
  Avatar,
  Stack,
  Square,
  Spinner,
  Button,
} from "tamagui";
import { Plus, X as CloseIcon, Check } from "@tamagui/lucide-icons";
import { scale } from "src/utils/functions/dimensions";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { ModalSheet } from "./ModalSheet";
import {
  useMemberSelection,
  DisplayMember,
} from "src/hooks/friends/useMemberSelection";
import { useAuthStore } from "src/stores/authStore";
import { useFriendsList } from "src/hooks/friends/useFriendsList";
import { useRouter } from "expo-router";

interface MemberSelectorProps {
  label?: string;
  helperText?: (count: number) => string;
  selectedMemberIds?: string[];
  onSelectionChange?: (memberIds: string[]) => void;
  excludeMemberIds?: string[]; // IDs of members already in the group (to filter them out)
}

const MemberSelector = ({
  label = "Members (optional)",
  helperText,
  selectedMemberIds: controlledMemberIds,
  onSelectionChange,
  excludeMemberIds = [],
}: MemberSelectorProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { authData } = useAuthStore();
  const currentUserId = authData?._id;
  const {
    data: friends = [],
    isLoading: isFriendsLoading,
    refetch: refetchFriends,
  } = useFriendsList();

  // Refetch friends when modal sheet opens
  useEffect(() => {
    if (sheetOpen) {
      refetchFriends();
    }
  }, [sheetOpen, refetchFriends]);

  // Use hook for internal state management
  const {
    selectedMemberIds: internalMemberIds,
    setSelectedMemberIds: setInternalMemberIds,
    selectedMembers: internalSelectedMembers,
    availableFriends: allAvailableFriends,
    handleToggleMember: internalHandleToggle,
    handleRemoveMember: internalHandleRemove,
  } = useMemberSelection();

  // Filter out friends that are already in the group (excludeMemberIds)
  const availableFriends = useMemo(() => {
    if (excludeMemberIds.length === 0) return allAvailableFriends;
    return allAvailableFriends.filter(
      (friend) => !excludeMemberIds.includes(friend._id)
    );
  }, [allAvailableFriends, excludeMemberIds]);

  // Use controlled or internal state
  const isControlled = controlledMemberIds !== undefined;
  const selectedMemberIds = isControlled
    ? controlledMemberIds
    : internalMemberIds;

  // Compute selectedMembers based on current selectedMemberIds
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

  // Override handlers to work with controlled state
  const handleToggle = (memberId: string) => {
    if (currentUserId === memberId) return;

    if (isControlled && onSelectionChange) {
      const current = selectedMemberIds;
      if (current.includes(memberId)) {
        onSelectionChange(current.filter((id) => id !== memberId));
      } else {
        onSelectionChange([...current, memberId]);
      }
    } else {
      internalHandleToggle(memberId);
    }
  };

  const handleRemove = (memberId: string) => {
    if (currentUserId === memberId) return;

    if (isControlled && onSelectionChange) {
      onSelectionChange(selectedMemberIds.filter((id) => id !== memberId));
    } else {
      internalHandleRemove(memberId);
    }
  };

  const hasAdditionalMembers = selectedMembers.length > 1;

  const getAvatarSource = (member: DisplayMember) => {
    return (
      member.profilePicture ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        member.name || "Member"
      )}&background=2f3640&color=ffffff`
    );
  };

  const router = useRouter();

  return (
    <>
      <YStack
        gap={scale(10)}
        //  borderWidth={1}
        borderColor="red"
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap={scale(12)} py={scale(4)} pr={scale(10)}>
            {selectedMembers.map((member) => {
              const avatarSource = getAvatarSource(member);

              return (
                <Stack
                  key={member._id}
                  items="center"
                  gap={scale(6)}
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
                        <Pressable onPress={() => handleRemove(member._id)}>
                          <Square
                            size={scale(24)}
                            rounded={scale(12)}
                            bg="$backgroundSecondary"
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
              // onPress={() => router.push("/membersSelector")}
              onPress={() => setSheetOpen(true)}
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

        {hasAdditionalMembers && helperText && (
          <MyText color="$textSecondary" fontSize={scale(13)} px={scale(2)}>
            {helperText(selectedMembers.length)}
          </MyText>
        )}
      </YStack>

      <ModalSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[70]}
      >
        <YStack gap={scale(10)} flex={1} borderColor="green">
          <XStack items="center" justify="space-between">
            <YStack gap={scale(4)}>
              <MyText
                color="$textPrimary"
                fontSize={scale(18)}
                fontWeight="600"
              >
                Select members
              </MyText>
              {!isFriendsLoading && (
                <MyText color="$textSecondary" fontSize={scale(13)}>
                  {availableFriends.length} friend
                  {availableFriends.length !== 1 ? "s" : ""} available
                  {excludeMemberIds.length > 0 &&
                    ` (${excludeMemberIds.length} already in group)`}
                </MyText>
              )}
            </YStack>
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
                {excludeMemberIds.length > 0
                  ? "All your friends are already in this group."
                  : "You don't have any friends to add yet."}
              </MyText>
              <MyText
                color="$textSecondary"
                fontSize={scale(12)}
                style={{ textAlign: "center" }}
              >
                {excludeMemberIds.length > 0
                  ? "Add more friends to your account to invite them to this group."
                  : "Once you add friends, you'll be able to include them here."}
              </MyText>
            </YStack>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                // borderWidth: 1,
                borderColor: "red",
                flex: 1,
                height: "100%",
              }}
            >
              <YStack
                gap={scale(12)}
                pb={scale(40)}
                // borderWidth={1}
                flex={1}
                mb={scale(55)}
                borderColor="blue"
              >
                {availableFriends.map((friend) => {
                  const isSelected = selectedMemberIds.includes(friend._id);
                  const avatarSource = getAvatarSource({
                    _id: friend._id,
                    name: friend.name || "Member",
                    email: friend.email,
                    profilePicture: friend.profilePicture,
                  });

                  return (
                    <Pressable
                      key={friend._id}
                      onPress={() => handleToggle(friend._id)}
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

              <Button
                bg="$accentYellow"
                color="$textSecondary"
                position="absolute"
                bottom={scale(0)}
                left={scale(0)}
                right={scale(0)}
                height={scale(52)}
                onPress={() => setSheetOpen(false)}
              >
                Done
              </Button>
            </ScrollView>
          )}
        </YStack>
      </ModalSheet>
    </>
  );
};

export default MemberSelector;
