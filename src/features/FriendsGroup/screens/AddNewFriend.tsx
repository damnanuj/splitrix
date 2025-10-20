import { useEffect } from "react";
import { YStack, XStack, Button, Avatar } from "tamagui";
import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import { useRouter } from "expo-router";
import { useUserStore } from "src/stores/userStore";
import { useAuthStore } from "src/stores/authStore";
import type { AppUser as User } from "src/stores/userStore";
import LoaderWithText from "src/components/common/LoaderWithText";

const AddNewFriend = () => {
  const router = useRouter();
  const { users, isLoading, isRefreshing, addingIds, fetchUsers, addAsFriend } =
    useUserStore();
  const { authData } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const onRefresh = () => {
    fetchUsers({ refresh: true });
  };

  const handleAddFriend = async (userId: string) => {
    await addAsFriend(userId);
  };

  const renderUserItem = ({ item }: { item: User }) => {
    const isAdding = addingIds.has(item._id);
    const currentUserId = authData?._id;
    const isAlreadyFriend =
      item.friends && currentUserId && item.friends.includes(currentUserId);
    const avatarUrl =
      item.profilePicture || "https://randomuser.me/api/portraits/men/10.jpg";

    return (
      <XStack
        gap={scale(20)}
        items="center"
        justify="space-between"
        py={scale(15)}
        borderBottomWidth={1}
        borderColor="$backgroundSecondary"
        // bg="$backgroundSecondary"
      >
        <XStack
          gap={scale(20)}
          items="center"
          flex={1}
          // borderWidth={1}
          borderColor="red"
        >
          <Avatar rounded={scale(10)} size={scale(50)}>
            <Avatar.Image
              accessibilityLabel={item.name || "User"}
              src={avatarUrl}
            />
            <Avatar.Fallback delayMs={600} backgroundColor="lightgray" />
          </Avatar>
          <YStack flex={1}>
            <MyText color="$textPrimary" fontSize={scale(16)} fontWeight="600">
              {item.name || "Unknown User"}
            </MyText>
            <MyText color="$textSecondary" fontSize={scale(14)}>
              {item.email || "No email"}
            </MyText>
          </YStack>
        </XStack>

        <Button
          onPress={() => !isAlreadyFriend && handleAddFriend(item._id)}
          bg={isAlreadyFriend ? "$accentGreen" : "$accentYellow"}
          color="$textPrimary"
          fontSize={scale(14)}
          fontWeight="600"
          p={scale(10)}
          px={scale(15)}
          rounded={scale(8)}
          disabled={isAdding || !!isAlreadyFriend}
          opacity={isAdding ? 0.6 : 1}
          // width={"auto"}
          width={scale(80)}
        >
          {isAdding ? (
            <ActivityIndicator size="small" color="#000" />
          ) : isAlreadyFriend ? (
            "Added"
          ) : (
            "Add"
          )}
        </Button>
      </XStack>
    );
  };

  return (
    <YStack bg="$background" flex={1} px={scale(25)} gap={scale(20)}>
      <BackButtonWithHeader title="Add New Friend" />

      {isLoading ? (
        <LoaderWithText text="Loading users..." />
      ) : (
        <>
          <YStack gap={scale(10)}>
            <MyText color="$textPrimary" fontSize={scale(16)}>
              Select a user to add as friend
            </MyText>
          </YStack>

          <YStack flex={1} mb={scale(80)}>
            {users.length === 0 ? (
              <YStack flex={1} justify="center" items="center" gap={scale(20)}>
                <MyText color="$textSecondary" fontSize={scale(16)}>
                  No users available to add as friends
                </MyText>
                <MyText color="$textSecondary" fontSize={scale(14)}>
                  All users are already your friends or there are no other users
                  in the system.
                </MyText>
              </YStack>
            ) : (
              <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={renderUserItem}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    tintColor="#FFD700"
                    colors={["#FFD700"]}
                  />
                }
                contentContainerStyle={{
                  paddingBottom: scale(20),
                }}
              />
            )}
          </YStack>
        </>
      )}
    </YStack>
  );
};

export default AddNewFriend;
