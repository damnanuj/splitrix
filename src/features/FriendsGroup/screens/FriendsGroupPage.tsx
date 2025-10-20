import { useState } from "react";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import CustomTabs from "src/components/common/CustomTabs";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import FriendsHeader from "src/features/FriendsGroup/components/FriendsHeader";
import FriendsToggler from "src/features/FriendsGroup/components/FriendsToggler";
import { scale } from "src/utils/functions/dimensions";
import { Stack, XStack, YStack } from "tamagui";
import FriendsList from "src/features/FriendsGroup/components/FriendsList";
import FriendsGroups from "src/features/FriendsGroup/components/FriendsGroups";
import { useRouter } from "expo-router";

const FriendsGroupPage = () => {
  const [selected, setSelected] = useState("groups");
  const router = useRouter();

  const handleAddNew = () => {
    if (selected === "groups") {
      router.push("/addNewGroup");
    } else {
      router.push("/addNewFriend");
    }
  };

  return (
    <YStack
      // borderWidth={1}
      bg={"$background"}
      flex={1}
      px={scale(25)}
      //   borderWidth={2}
      borderColor={"green"}
      overflow="hidden"
      gap={scale(20)}
    >
      <FriendsHeader />
      <FriendsToggler selected={selected} setSelected={setSelected} />
      <XStack justify={"space-between"} items={"center"}>
        <MyText color={"$textPrimary"} fontSize={scale(16)}>
          {selected === "groups" ? "All Groups" : "All Friends"}
        </MyText>
        <MyText 
          color={"$accentYellow"}
          onPress={handleAddNew}
          pressStyle={{ opacity: 0.6 }}
        >
          {selected === "groups" ? "+ Add New Group" : "+ Add New Friend"}
        </MyText>
      </XStack>
      {selected === "friends" ? <FriendsList /> : <FriendsGroups />}
    </YStack>
  );
};

export default FriendsGroupPage;
