import React, { useState } from "react";

import { MotiView } from "moti";

import { Dimensions, Pressable } from "react-native";
import { Stack, useTheme, XStack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";
import MyText from "../customTabBars/styleComponents/MyText";
const { width: screenWidth } = Dimensions.get("window");

const CustomTabs = ({ tabs, activeTab, setActiveTab }: any) => {
  // console.log(tabs, "tabssss");
  const activeIndex = tabs?.findIndex((tab: any) => tab?.key === activeTab);
  const containerPixelWidth = screenWidth;
  const tabWidth = 100 / Number(tabs?.length); // Dynamic width
  const translateXValue = Number(tabWidth);
  // const singleTabPixelWidth = containerPixelWidth / tabs.length;
  const [hStackWidth, setHStackWidth] = useState(screenWidth);
  // Calculate translateX as a pixel value
  const singleTabPixelWidth = hStackWidth / tabs?.length;
  const translateXPixelValue = activeIndex * singleTabPixelWidth;
  // console.log(tabs, "tabs");
  const theme = useTheme();
  return (
    <Stack
      width="100%"
      height={scale(45)}
      justify="center"
      items="center"
      // borderWidth={1}
      borderColor={"red"}
    >
      <XStack
        borderWidth={1.3}
        borderColor={"$accentYellow"}
        width="100%"
        height="100%"
        // bg={"green"}
        rounded={scale(150)}
        position="relative"
        overflow="hidden"
        onLayout={(event) => {
          // <--- CRUCIAL ADDITION
          const { width } = event.nativeEvent.layout;
          setHStackWidth(width); // Update state with actual measured width
        }}
      >
        {/* Animated Active Tab Indicator */}
        <MotiView
          from={{ translateX: translateXPixelValue }}
          animate={{ translateX: translateXPixelValue }}
          transition={{ type: "spring", damping: 50, stiffness: 150 }}
          style={{
            position: "absolute",
            width: `${100 / tabs.length}%`,
            height: "103%",
            backgroundColor: theme.accentYellow.val,
            borderRadius: scale(100),
            // borderWidth: 1,
            borderColor: theme.accentYellow,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 6,
            elevation: 4,
          }}
        />

        {/* Tab Buttons */}
        {tabs.map((tab: any) => (
          <Pressable
            key={tab.key}
            flex={1}
            justifyContent="center"
            alignItems="center"
            onPress={() => setActiveTab(tab.key)}
          >
            <MyText
              fontSize={scale(13)}
              fontWeight={700}
              color={activeTab === tab.key ? "$background" : "$accentYellow"}
            >
              {tab.label}
            </MyText>
          </Pressable>
        ))}
      </XStack>
    </Stack>
  );
};

export default CustomTabs;
