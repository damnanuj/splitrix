import { Avatar, XStack, YStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import { FlatList, RefreshControl, ActivityIndicator } from "react-native";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { useFriendsStore } from "src/stores/friendsStore";
import { useEffect, useCallback, memo } from "react";
import LoaderWithText from "src/components/common/LoaderWithText";
import { Friend } from "src/stores/types";
import { FriendsListSkeleton } from "./skeleton";

interface FriendItemProps {
  friend: Friend;
}

const FriendItem = memo(({ friend }: FriendItemProps) => {
  const { name, profilePicture, balance } = friend;

  const renderStatus = useCallback(() => {
    if (balance.status === "friend_owes_me") {
      return (
        <MyText fontSize={scale(12)} color="$textSecondary">
          Owes you <MyText color="$accentGreen">₹{balance.amount}</MyText>
        </MyText>
      );
    } else if (balance.status === "i_owe_friend") {
      return (
        <MyText fontSize={scale(12)} color="$textSecondary">
          You owe <MyText color="tomato">₹{balance.amount}</MyText>
        </MyText>
      );
    } else {
      return (
        <MyText fontSize={scale(12)} color="$textSecondary">
          No pending expenses
        </MyText>
      );
    }
  }, [balance.status, balance.amount]);

  return (
    <XStack
      gap={scale(20)}
      items="center"
      py={scale(12)}
      px={scale(4)}
      hoverStyle={{ bg: "$backgroundSecondary" }}
    >
      <Avatar rounded={scale(10)} size={scale(60)}>
        <Avatar.Image
          accessibilityLabel={name}
          src={
            profilePicture || "https://randomuser.me/api/portraits/men/10.jpg"
          }
        />
        <Avatar.Fallback delayMs={600} backgroundColor="lightgray" />
      </Avatar>
      <YStack flex={1}>
        <MyText fontSize={scale(16)} fontWeight="600" color="$textPrimary">
          {name}
        </MyText>
        {renderStatus()}
      </YStack>
    </XStack>
  );
});

FriendItem.displayName = "FriendItem";

const FriendsList = () => {
  const { friends, isLoading, isRefreshing, error, fetchFriends } =
    useFriendsStore();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const onRefresh = useCallback(() => {
    fetchFriends({ refresh: true });
  }, [fetchFriends]);

  const renderFriendItem = useCallback(
    ({ item }: { item: Friend }) => <FriendItem friend={item} />,
    []
  );

  const keyExtractor = useCallback((item: Friend) => item._id, []);

  if (isLoading && friends.length === 0) {
    return <FriendsListSkeleton />;
  }

  if (error) {
    return (
      <YStack flex={1} justify="center" items="center" gap={scale(20)}>
        <MyText color="$textSecondary" fontSize={scale(16)}>
          Failed to load friends
        </MyText>
        <MyText color="$textSecondary" fontSize={scale(14)}>
          {error}
        </MyText>
      </YStack>
    );
  }

  if (friends.length === 0) {
    return (
      <YStack flex={1}  justify="center" items="center" gap={scale(20)}>
        <MyText color="$textSecondary" fontSize={scale(16)}>
          No friends yet
        </MyText>
        <MyText color="$textSecondary" fontSize={scale(14)}>
          Add some friends to start splitting expenses
        </MyText>
      </YStack>
    );
  }

  return (
    <YStack flex={1} mb={scale(80)}>
      <FlatList
        data={friends}
        keyExtractor={keyExtractor}
        renderItem={renderFriendItem}
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
          gap: scale(8),
        }}
        ItemSeparatorComponent={() => <YStack height={scale(8)} />}
      />
    </YStack>
  );
};

export default FriendsList;
