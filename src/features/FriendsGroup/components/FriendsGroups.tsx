import {
  ScrollView,
  XStack,
  YStack,
  Stack,
  Square,
  Image,
  useTheme,
} from "tamagui";
import MyText from "../../../components/customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import Feather from "@expo/vector-icons/Feather";
import { AccordionDemo } from "./GroupsAccordion";
import { ChevronDown } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { AnimatePresence, styled } from "tamagui";
import { Group } from "src/stores/types";
import { formatDate } from "src/utils/functions/formatDate";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Pressable, RefreshControl } from "react-native";
import { useGroups } from "src/hooks/group/useGroups";
import GroupsListSkeleton from "./skeleton/GroupsListSkeleton";
import { formatAmount } from "../screens/GroupDetailsScreen";

const FriendsGroups = () => {
  const { data, isLoading, error, refetch, isFetching } = useGroups();
  // console.log("groups", data, isFetching, isLoading, error);
  const displayGroups = Array.isArray(data) ? data : [];
  if (isLoading || isFetching) {
    return (
      <YStack
        //   borderWidth={1}
        borderColor={"red"}
        flex={1}
        //   pb={scale(80)}
        gap={scale(20)}
      >
        <YStack borderColor={"red"} flex={1} pb={scale(80)}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // borderWidth: 1,
              borderColor: "green",
              // gap: scale(15),
            }}
          >
            <GroupsListSkeleton />
          </ScrollView>
        </YStack>
      </YStack>
    );
  }

  if (data && data.length === 0) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // borderWidth: 1,
          borderColor: "green",
          // gap: scale(15),
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => refetch()}
            tintColor="#FFD700"
            colors={["#FFD700"]}
          />
        }
      >
        <YStack
          // borderWidth={1}
          borderColor="red"
          flex={1}
          // mb={scale(80)}
          items="center"
          gap={scale(0)}
        >
          <Image
            source={require("../../../../assets/images/add-friend.png")}
            width={scale(200)}
            height={scale(200)}
            resizeMode="cover"
          />
          <YStack items="center" gap={scale(8)}>
            <MyText
              style={{ textAlign: "center" }}
              color="$textSecondary"
              fontSize={scale(16)}
            >
              You don't have any groups yet.
            </MyText>
            <MyText
              style={{ textAlign: "center" }}
              color="$textSecondary"
              fontSize={scale(14)}
            >
              Create a group to start splitting expenses.
            </MyText>
          </YStack>
        </YStack>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // borderWidth: 1,
          borderColor: "green",
          // gap: scale(15),
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => refetch()}
            tintColor="#FFD700"
            colors={["#FFD700"]}
          />
        }
      >
        <YStack flex={1} items="center" justify="center" gap={scale(20)}>
          <MyText color="$accentRed" fontSize={scale(16)}>
            Failed to load groups
          </MyText>
          <MyText color="$textSecondary" fontSize={scale(14)}>
            {error.message}
          </MyText>
        </YStack>
      </ScrollView>
    );
  }

  return (
    <YStack
      //   borderWidth={1}
      borderColor={"red"}
      flex={1}
      //   pb={scale(80)}
      gap={scale(20)}
    >
      <YStack borderColor={"red"} flex={1} pb={scale(80)}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // borderWidth: 1,
            borderColor: "green",
            // gap: scale(15),
          }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => refetch()}
              tintColor="#FFD700"
              colors={["#FFD700"]}
            />
          }
        >
          {/* <AccordionDemo /> */}

          {displayGroups.map((group, idx) => (
            <GroupItem key={idx} group={group} />
          ))}
        </ScrollView>
      </YStack>
    </YStack>
  );
};
export default FriendsGroups;

const GroupItem = ({ group }: { group: Group }) => {
  const theme = useTheme();
  const { name: groupName, balance, _id } = group;
  const netBalance = balance?.net ?? 0;
  const normalizedBalance = Math.abs(netBalance);

  const handleGroupPress = () => {
    router.push({
      pathname: "/groupDetails",
      params: { groupId: _id },
    });
  };

  return (
    <Pressable onPress={handleGroupPress}>
      <XStack
        gap={scale(20)}
        borderBottomWidth={1}
        borderColor={"$backgroundSecondary"}
        items="center"
        py={scale(20)}
      >
        <Stack
          bg={"$backgroundSecondary"}
          width={55}
          height={55}
          rounded={scale(10)}
          justify="center"
          items="center"
        >
          {group.avatar ? (
            <Image
              source={{
                uri: group.avatar,
              }}
              width={"100%"}
              height={scale(55)}
              rounded={scale(10)}
            />
          ) : (
            <FontAwesome
              name="group"
              size={25}
              color={theme.accentYellow.val}
            />
          )}
        </Stack>

        <YStack justify="center" flex={1}>
          <MyText
            color={"$textPrimary"}
            fontSize={scale(16)}
            style={{ fontFamily: "MPlusRounded700" }}
          >
            {groupName}
          </MyText>

          <YStack>
            <MyText
              fontSize={scale(12)}
              color={
                netBalance < 0
                  ? "$accentRed"
                  : netBalance > 0
                  ? "$accentGreen"
                  : "gray"
              }
            >
              {netBalance < 0
                ? `You need to pay  ${formatAmount(normalizedBalance)}`
                : netBalance > 0
                ? `You will get back ${formatAmount(normalizedBalance)}`
                : "No pending expenses"}
            </MyText>
          </YStack>
        </YStack>

        {/* Chevron icon */}
        <Square
          // borderWidth={1}
          // borderColor={"red"}
          animation="quick"
          rotate={"-90deg"}
        >
          <ChevronDown size="$1" />
        </Square>
      </XStack>
    </Pressable>
  );
};
