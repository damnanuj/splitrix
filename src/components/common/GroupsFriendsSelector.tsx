import { useState, useEffect } from "react";
import { Pressable, ScrollView } from "react-native";
import { YStack, XStack, Avatar, Spinner, Button, Square } from "tamagui";
import { Check, ChevronRight } from "@tamagui/lucide-icons";
import { scale } from "src/utils/functions/dimensions";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { ModalSheet } from "./ModalSheet";
import { useGroups } from "src/hooks/group/useGroups";
import { useFriendsList } from "src/hooks/friends/useFriendsList";
import { useRouter } from "expo-router";
import { Group } from "src/stores/types";

interface GroupsFriendsSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GroupsFriendsSelector = ({
  open,
  onOpenChange,
}: GroupsFriendsSelectorProps) => {
  const router = useRouter();
  const { data: groups = [], isLoading: isGroupsLoading } = useGroups();
  const { data: friends = [], isLoading: isFriendsLoading } = useFriendsList();
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);

  // Reset selections when modal opens
  useEffect(() => {
    if (open) {
      setSelectedFriendIds([]);
    }
  }, [open]);

  // Reset selections when sheet closes
  const handleSheetClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedFriendIds([]);
    }
    onOpenChange(isOpen);
  };

  const handleGroupSelect = (group: Group) => {
    onOpenChange(false);
    setSelectedFriendIds([]);
    router.push({
      pathname: "/createGroupExpense",
      params: { groupId: group._id },
    });
  };

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriendIds((prev) => {
      if (prev.includes(friendId)) {
        return prev.filter((id) => id !== friendId);
      }
      return [...prev, friendId];
    });
  };

  const handleNext = () => {
    if (selectedFriendIds.length === 0) return;

    onOpenChange(false);
    // If only one friend selected, pass it as selectedFriendId
    // If multiple friends selected, pass all as comma-separated string
    const friendIdsParam =
      selectedFriendIds.length === 1
        ? selectedFriendIds[0]
        : selectedFriendIds.join(",");

    router.push({
      pathname: "/addNewGroup",
      params: { selectedFriendIds: friendIdsParam },
    });
    setSelectedFriendIds([]);
  };

  const getAvatarSource = (name: string, profilePicture?: string) => {
    return (
      profilePicture ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "User"
      )}&background=2f3640&color=ffffff`
    );
  };

  return (
    <ModalSheet
      open={open}
      onOpenChange={handleSheetClose}
      snapPoints={[85]}
      snapPointsMode="percent"
    >
      <YStack flex={1} position="relative">
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: selectedFriendIds.length > 0 ? scale(80) : scale(20),
          }}
        >
          <YStack gap={scale(20)}>
            <MyText color="$textPrimary" fontSize={scale(20)} fontWeight="600">
              Select Group or Friend
            </MyText>

            {/* Groups Section - First 50% */}
            <YStack gap={scale(12)}>
              <MyText
                color="$textPrimary"
                fontSize={scale(16)}
                fontWeight="600"
              >
                Groups
              </MyText>
              {isGroupsLoading ? (
                <YStack
                  items="center"
                  justify="center"
                  py={scale(40)}
                  gap={scale(12)}
                >
                  <Spinner size="small" color="$textSecondary" />
                  <MyText color="$textSecondary">Loading groups...</MyText>
                </YStack>
              ) : groups.length === 0 ? (
                <YStack
                  items="center"
                  justify="center"
                  py={scale(40)}
                  gap={scale(8)}
                >
                  <MyText color="$textSecondary" fontSize={scale(14)}>
                    You don't have any groups yet.
                  </MyText>
                  <MyText
                    color="$textSecondary"
                    fontSize={scale(12)}
                    style={{ textAlign: "center" }}
                  >
                    Create a group to start splitting expenses.
                  </MyText>
                </YStack>
              ) : (
                <YStack gap={scale(12)}>
                  {groups.map((group) => {
                    const avatarSource = getAvatarSource(
                      group.name,
                      group.avatar
                    );

                    return (
                      <Pressable
                        key={group._id}
                        onPress={() => handleGroupSelect(group)}
                      >
                        <XStack
                          gap={scale(16)}
                          items="center"
                          p={scale(12)}
                          borderWidth={1}
                          borderColor="$backgroundSecondary"
                          bg="$backgroundSecondary"
                          rounded={scale(12)}
                        >
                          <Avatar size={scale(48)} rounded={scale(12)}>
                            <Avatar.Image
                              accessibilityLabel={group.name}
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
                              {group.name}
                            </MyText>
                          </YStack>
                          <ChevronRight size={scale(24)} color="$textPrimary" />
                        </XStack>
                      </Pressable>
                    );
                  })}
                </YStack>
              )}
            </YStack>

            {/* Friends Section - Second 50% */}
            <YStack gap={scale(12)}>
              <MyText
                color="$textPrimary"
                fontSize={scale(16)}
                fontWeight="600"
              >
                Friends
              </MyText>
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
              ) : friends.length === 0 ? (
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
                    Add friends to create groups with them.
                  </MyText>
                </YStack>
              ) : (
                <YStack gap={scale(12)}>
                  {friends.map((friend) => {
                    const avatarSource = getAvatarSource(
                      friend.name,
                      friend.profilePicture
                    );
                    const isSelected = selectedFriendIds.includes(friend._id);

                    return (
                      <Pressable
                        key={friend._id}
                        onPress={() => handleFriendToggle(friend._id)}
                      >
                        <XStack
                          gap={scale(16)}
                          items="center"
                          p={scale(12)}
                          borderWidth={1}
                          borderColor={
                            isSelected
                              ? "$accentYellow"
                              : "$backgroundSecondary"
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
              )}
            </YStack>
          </YStack>
        </ScrollView>

        {/* Next Button - Fixed at bottom */}
        {selectedFriendIds.length > 0 && (
          <YStack
            position="absolute"
            style={{
              bottom: 0,
              left: -scale(16),
              right: -scale(16),
            }}
            px={scale(20)}
            pt={scale(16)}
            pb={0}
            bg="$background"
            borderTopWidth={1}
            borderTopColor="$backgroundSecondary"
          >
            <Button
              onPress={handleNext}
              bg="$accentYellow"
              color="$accentBlack"
              fontSize={scale(16)}
              fontWeight="600"
              height={scale(56)}
              rounded={scale(16)}
              disabled={selectedFriendIds.length === 0}
              pressStyle={{ opacity: 0.85 }}
            >
              <MyText
                color="$accentBlack"
                fontSize={scale(16)}
                fontWeight="600"
              >
                Next ({selectedFriendIds.length} selected)
              </MyText>
            </Button>
          </YStack>
        )}
      </YStack>
    </ModalSheet>
  );
};

export default GroupsFriendsSelector;
