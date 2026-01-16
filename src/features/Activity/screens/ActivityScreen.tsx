import { ScrollView, YStack, Image } from "tamagui";
import { RefreshControl } from "react-native";
import { scale } from "src/utils/functions/dimensions";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { useActivities } from "src/hooks/activity/useActivities";
import { ActivityItem } from "../components/ActivityItem";
import { ActivityListSkeleton } from "../components/skeleton";

const ActivityScreen = () => {
  const {
    data: activities = [],
    isLoading,
    refetch,
    isRefetching,
  } = useActivities();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <YStack flex={1} bg="$background">
      {/* Header */}
      <YStack px={scale(24)} pt={scale(16)} pb={scale(12)}>
        <MyText
          color="$textPrimary"
          fontSize={scale(24)}
          style={{ fontFamily: "MPlusRounded700" }}
        >
          Activity
        </MyText>
        <MyText color="$textSecondary" fontSize={scale(14)} mt={scale(4)}>
          Recent activity in your groups
        </MyText>
      </YStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor="#FFD700"
            colors={["#FFD700"]}
          />
        }
        contentContainerStyle={{
          pb: scale(80),
          px: scale(24),
          pt: scale(8),
          gap: scale(18),
        }}
      >
        {isLoading ? (
          <ActivityListSkeleton />
        ) : activities.length === 0 ? (
          <YStack
            items="center"
            justify="center"
            py={scale(60)}
            gap={scale(20)}
          >
            <Image
              source={require("../../../../assets/images/no-results-found.png")}
              width={scale(250)}
              height={scale(250)}
              resizeMode="cover"
            />
            <YStack items="center" gap={scale(8)}>
              <MyText color="$textSecondary" fontSize={scale(16)}>
                No activities yet
              </MyText>
              <MyText
                color="$textSecondary"
                fontSize={scale(14)}
                style={{ textAlign: "center" }}
              >
                Your activity feed will appear here
              </MyText>
            </YStack>
          </YStack>
        ) : (
          <YStack gap={scale(4)}>
            {activities.map((activity) => (
              <ActivityItem key={activity._id} activity={activity} />
            ))}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  );
};

export default ActivityScreen;
