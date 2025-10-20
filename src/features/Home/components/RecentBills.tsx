import { Button, ScrollView, Stack, useTheme, XStack, YStack } from "tamagui";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import Feather from "@expo/vector-icons/Feather";
import themeColors from "src/utils/theme/colors";
import { scale } from "src/utils/functions/dimensions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BackAndForthMarqueeText from "src/components/common/MarqueeText";
import { useState } from "react";
import { PopoverDemo } from "./MenuPopover";
import { useRouter } from "expo-router";

const RecentBills = () => {
  // console.log("RecentBills render");

  const theme = useTheme();
  const router = useRouter();

  return (
    <YStack
      // borderWidth={1}
      my={scale(20)}
      borderColor={"white"}
      gap={scale(20)}
    >
      <XStack
        justify={"space-between"}
        //   borderColor={"white"}
        //   borderWidth={1}
      >
        <MyText fontSize={scale(16)} color={"$textPrimary"}>
          Recent Bills
        </MyText>
        <Button
          borderWidth={0}
          rounded={scale(8)}
          borderColor={"white"}
          bg={"$backgroundSecondary"}
          px={scale(15)}
          onPress={() => router.push("/addBill")}
        >
          <XStack gap={scale(3)}>
            <Feather name="plus" size={20} color={theme.accentYellow.val} />
            <MyText color={"$accentYellow"}>Add Bills</MyText>
          </XStack>
        </Button>
      </XStack>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          // borderWidth: 1,
          borderColor: "green",
          gap: scale(20),
        }}
      >
        {[...Array(5)].map((_, idx) => (
          <RecentBillCard theme={theme} key={idx} />
        ))}
      </ScrollView>
    </YStack>
  );
};

export default RecentBills;

const RecentBillCard = ({ theme }) => {
  return (
    <YStack
      // borderWidth={1}
      bg={"$backgroundSecondary"}
      // bg={themeColors.dark.SECONDARY}
      rounded={scale(10)}
      borderColor={"white"}
      //   height={scale(100, true)}
      self={"flex-start"}
      maxW={scale(162)}
      p={scale(15)}
      px={scale(18)}
      pb={scale(30)}
      mb={scale(20)}
    >
      <XStack
        width={"100%"}
        // borderWidth={1}
        borderColor="red"
        justify={"space-between"}
        // paddingHorizontal={scale(10)}
      >
        <BackAndForthMarqueeText
          text="Something trip bill"
          maxChars={14}
          textStyle={{
            fontSize: scale(14),
            color: themeColors.dark.TEXT_SECONDARY,
            fontFamily: "MPlusRounded400",
          }}
        />

        {/* <Button > */}

        <Stack mr={scale(-10)}>
          <PopoverDemo />
        </Stack>
      </XStack>

      <XStack
        //   borderWidth={1}
        borderColor={"white"}
      >
        <YStack
          // borderWidth={1}
          borderColor={"white"}
        >
          <MyText
            fontSize={scale(16)}
            style={{ fontFamily: "MPlusRounded700" }}
            color={"$textPrimary"}
          >
            ₹90.00{" "}
            <MyText fontSize={scale(12)} color={"$textSecondary"}>
              / ₹360.00
            </MyText>
          </MyText>
          <MyText fontSize={scale(13)} color={"$textSecondary"}>
            Your split
          </MyText>
        </YStack>
        {/* <MyText fontSize={scale(22)} color={themeColors.dark.TEXT_PRIMARY}>
          ₹360
        </MyText> */}
      </XStack>

      <Button
        rounded={scale(8)}
        borderColor={"white"}
        bg={"$accentYellow"}
        // px={scale(15)}
        height={scale(35)}
        borderWidth={0}
        position="absolute"
        b={scale(-17)}
        l={scale(15)}
        r={scale(15)}
      >
        <XStack items={"center"} gap={scale(5)}>
          <MaterialCommunityIcons
            name="arrow-split-vertical"
            size={18}
            color={theme.accentBlack.val}
          />
          <MyText
            fontSize={scale(12)}
            style={{ fontFamily: "MPlusRounded800" }}
            color={"$accentBlack"}
          >
            Split the bills
          </MyText>
        </XStack>
      </Button>
    </YStack>
  );
};
