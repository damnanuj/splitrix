import { ScrollView, XStack, YStack, Stack, Square } from "tamagui";
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
import { Pressable } from "react-native";
import { useGroups } from "src/hooks/group/useGroups";
import GroupsListSkeleton from "./skeleton/GroupsListSkeleton";

const FriendsGroups = () => {
  const { data, isLoading, error, refetch } = useGroups();
  console.log("groups", data);
  const displayGroups = Array.isArray(data) ? data : [];
  if (isLoading) {
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

  if (error) {
    return (
      <YStack flex={1} items="center" justify="center" gap={scale(20)}>
        <MyText color="$red10" fontSize={scale(16)}>
          Failed to load groups
        </MyText>
        <MyText color="$textSecondary" fontSize={scale(14)}>
          {error.message}
        </MyText>
      </YStack>
    );
  }

  if (displayGroups.length === 0) {
    return (
      <YStack flex={1} items="center" justify="center" gap={scale(20)}>
        <MyText color="$textSecondary" fontSize={scale(16)}>
          No groups found
        </MyText>
        <MyText color="$textSecondary" fontSize={scale(14)}>
          Create a group or wait for invitations
        </MyText>
        <MyText
          color="$blue10"
          fontSize={scale(14)}
          style={{ textDecorationLine: "underline" }}
          onPress={() => refetch()}
        >
          Tap to refresh
        </MyText>
      </YStack>
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
  const { name: groupName, balance, _id } = group;
  const { net, amountOwed, amountToReceive } = balance;

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
          <FontAwesome name="group" size={25} color="#f1c40f" />
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
                amountOwed > 0
                  ? "tomato"
                  : amountToReceive > 0
                  ? "green"
                  : "gray"
              }
            >
              {amountOwed > 0
                ? `You need to pay Rs. ${amountOwed}`
                : amountToReceive > 0
                ? `You are owed Rs. ${amountToReceive}`
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

const billsData = [
  {
    icon: "film",
    title: "Movie Fun",
    amount: 320,
    time: "Jul 14 25 | 08:30 PM",
    iconColor: "#3498db", // blue
  },
  {
    icon: "zap",
    title: "Electricity Bill",
    amount: 1450,
    time: "Jul 13 25 | 06:00 PM",
    iconColor: "#f1c40f", // yellow
  },
  {
    icon: "shopping-cart",
    title: "Grocery Shopping",
    amount: 790,
    time: "Jul 12 25 | 04:15 PM",
    iconColor: "#2ecc71", // green
  },
  {
    icon: "home",
    title: "House Rent",
    amount: 18000,
    time: "Jul 01 25 | 12:00 PM",
    iconColor: "#9b59b6", // purple
  },
  {
    icon: "wifi",
    title: "WiFi Recharge",
    amount: 499,
    time: "Jul 10 25 | 10:00 AM",
    iconColor: "#e74c3c", // red
  },
  {
    icon: "phone",
    title: "Mobile Bill",
    amount: 299,
    time: "Jul 11 25 | 03:45 PM",
    iconColor: "#1abc9c", // teal
  },
  {
    icon: "coffee",
    title: "Cafe Snacks",
    amount: 220,
    time: "Jul 09 25 | 05:20 PM",
    iconColor: "#e67e22", // orange
  },
  {
    icon: "gift",
    title: "Gift Shopping",
    amount: 2100,
    time: "Jul 06 25 | 07:00 PM",
    iconColor: "#ff6b81", // pink
  },
  {
    icon: "globe",
    title: "Domain Renewal",
    amount: 799,
    time: "Jul 02 25 | 11:30 AM",
    iconColor: "#16a085", // emerald
  },
  {
    icon: "briefcase",
    title: "Coworking Rent",
    amount: 4000,
    time: "Jul 05 25 | 09:00 AM",
    iconColor: "#34495e", // dark gray
  },
];
