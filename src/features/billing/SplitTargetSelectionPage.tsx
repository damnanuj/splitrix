import { useState } from "react";
import { ScrollView, Pressable } from "react-native";
import { Avatar, Button, Spinner, Stack, XStack, YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import GroupsFriendsSelector from "src/components/common/GroupsFriendsSelector";
import { useGroups } from "src/hooks/group/useGroups";
import { useFriendsList } from "src/hooks/friends/useFriendsList";
import { useRouter } from "expo-router";
import CustomTabs from "src/components/common/CustomTabs";

type TabKey = "groups" | "friends";

const SplitTargetSelectionPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("groups");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const {
    data: groups = [],
    isLoading: isGroupsLoading,
    error: groupsError,
    refetch: refetchGroups,
  } = useGroups();
  const {
    data: friends = [],
    isLoading: isFriendsLoading,
    error: friendsError,
    refetch: refetchFriends,
  } = useFriendsList();

  const getAvatarSource = (name: string, profilePicture?: string) => {
    return (
      profilePicture ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "User"
      )}&background=2f3640&color=ffffff`
    );
  };

  const renderGroupsList = () => {
    if (isGroupsLoading) {
      return (
        <YStack items="center" justify="center" flex={1} gap={scale(8)}>
          <Spinner size="small" color="$textSecondary" />
          <MyText color="$textSecondary">Loading groups...</MyText>
        </YStack>
      );
    }

    if (groupsError) {
      return (
        <YStack items="center" justify="center" flex={1} gap={scale(8)}>
          <MyText color="$textSecondary">{groupsError.message}</MyText>
          <Button size="$3" onPress={() => refetchGroups()}>
            Retry
          </Button>
        </YStack>
      );
    }

    if (!groups.length) {
      return (
        <YStack items="center" justify="center" flex={1} gap={scale(8)}>
          <MyText color="$textSecondary">You have no groups yet.</MyText>
          <MyText
            color="$textSecondary"
            fontSize={scale(12)}
            style={{ textAlign: "center" }}
          >
            Create a group to start splitting expenses with friends.
          </MyText>
        </YStack>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap={scale(12)} pb={scale(80)}>
          {groups.map((group) => (
            <Pressable
              key={group._id}
              onPress={() =>
                router.push({
                  pathname: "/groupDetails",
                  params: { groupId: group._id },
                })
              }
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
                <Avatar size={scale(54)} rounded={scale(14)}>
                  <Avatar.Image
                    src={getAvatarSource(group.name, group.avatar)}
                    accessibilityLabel={group.name}
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="#444" />
                </Avatar>

                <YStack flex={1} gap={scale(4)}>
                  <MyText
                    color="$textPrimary"
                    fontSize={scale(15)}
                    fontWeight="600"
                  >
                    {group.name}
                  </MyText>
                  <MyText color="$textSecondary" fontSize={scale(13)}>
                    {group.description || "No description"}
                  </MyText>
                  <MyText color="$textSecondary" fontSize={scale(12)}>
                    {group.members?.length || 0} members
                  </MyText>
                </YStack>
              </XStack>
            </Pressable>
          ))}
        </YStack>
      </ScrollView>
    );
  };

  const renderFriendsList = () => {
    if (isFriendsLoading) {
      return (
        <YStack items="center" justify="center" flex={1} gap={scale(8)}>
          <Spinner size="small" color="$textSecondary" />
          <MyText color="$textSecondary">Loading friends...</MyText>
        </YStack>
      );
    }

    if (friendsError) {
      return (
        <YStack items="center" justify="center" flex={1} gap={scale(8)}>
          <MyText color="$textSecondary">{friendsError.message}</MyText>
          <Button size="$3" onPress={() => refetchFriends()}>
            Retry
          </Button>
        </YStack>
      );
    }

    if (!friends.length) {
      return (
        <YStack items="center" justify="center" flex={1} gap={scale(8)}>
          <MyText color="$textSecondary">No friends yet.</MyText>
          <MyText
            color="$textSecondary"
            fontSize={scale(12)}
            style={{ textAlign: "center" }}
          >
            Add friends so you can start splitting expenses together.
          </MyText>
        </YStack>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap={scale(12)} pb={scale(80)}>
          {friends.map((friend) => (
            <Pressable key={friend._id}>
              <XStack
                gap={scale(16)}
                items="center"
                p={scale(12)}
                borderWidth={1}
                borderColor="$backgroundSecondary"
                bg="$backgroundSecondary"
                rounded={scale(12)}
              >
                <Avatar size={scale(54)} rounded={scale(14)}>
                  <Avatar.Image
                    src={getAvatarSource(friend.name, friend.profilePicture)}
                    accessibilityLabel={friend.name}
                  />
                  <Avatar.Fallback delayMs={600} backgroundColor="#444" />
                </Avatar>

                <YStack flex={1} gap={scale(4)}>
                  <MyText
                    color="$textPrimary"
                    fontSize={scale(15)}
                    fontWeight="600"
                  >
                    {friend.name}
                  </MyText>
                  {/* <MyText color="$textSecondary" fontSize={scale(13)}>
                    {friend.email}
                  </MyText> */}
                </YStack>
              </XStack>
            </Pressable>
          ))}
        </YStack>
      </ScrollView>
    );
  };

  return (
    <>
      <YStack flex={1} bg="$background">
        <YStack px={scale(24)} flex={1}>
          <BackButtonWithHeader title="Split Expense" />

          <Stack mb={scale(12)}>
            <CustomTabs
              tabs={[
                { key: "groups", label: "Groups" },
                { key: "friends", label: "People" },
              ]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Stack>

          <Stack flex={1}>
            {activeTab === "groups" ? renderGroupsList() : renderFriendsList()}
          </Stack>
        </YStack>

        <Stack
          px={scale(24)}
          py={scale(16)}
          borderTopWidth={1}
          borderColor="$backgroundSecondary"
          bg="$background"
        >
          <Button
            onPress={() => setSelectorOpen(true)}
            bg="$accentYellow"
            color="$accentBlack"
            fontSize={scale(16)}
            fontWeight="600"
            height={scale(56)}
            rounded={scale(16)}
            pressStyle={{ opacity: 0.85 }}
          >
            Split Expense
          </Button>
        </Stack>
      </YStack>

      <GroupsFriendsSelector
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
      />
    </>
  );
};

export default SplitTargetSelectionPage;
