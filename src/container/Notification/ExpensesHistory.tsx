import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "tamagui";
import { YStack } from "tamagui";
import { expenses } from "./notificationDummyData";
import { NotificationItem } from "src/components/notification/NotificationItem";
import { scale } from "src/utils/functions/dimensions";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import { formatDate } from "src/utils/functions/formatDate";

const ExpensesHistory = () => {
  return (
    <YStack flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(20) }}
      >
        {Object.entries(expenses).map(([date, items], idx) => (
          <YStack key={idx} mb={scale(20)}>
            <MyText fontSize={scale(14)} color={"$textSecondary"} mb={scale(5)}>
              {formatDate(date)}
            </MyText>

            {items.map((item, index) => (
              <NotificationItem key={index} {...item} />
            ))}
          </YStack>
        ))}
      </ScrollView>
    </YStack>
  );
};

export default ExpensesHistory;
