import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTabs from "../common/CustomTabs";
import { Stack } from "tamagui";
import { scale } from "src/utils/functions/dimensions";

const FriendsToggler = ({ selected, setSelected }) => {
  const handlePress = (button: string) => {
    setSelected(button);
  };
  return (
    <Stack borderWidth={1} borderColor={"yellow"}>
      <CustomTabs
        tabs={[
          { key: "groups", label: "Groups" },
          { key: "friends", label: "Friends" },
        ]}
        activeTab={selected}
        setActiveTab={handlePress}
      />
    </Stack>
  );
};

export default FriendsToggler;
