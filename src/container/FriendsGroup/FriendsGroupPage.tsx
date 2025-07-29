import { useState } from "react";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";
import CustomTabs from "src/components/common/CustomTabs";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import FriendsHeader from "src/components/friendsGroups/FriendsHeader";
import FriendsList from "src/components/friendsGroups/FriendsList";
import FriendsToggler from "src/components/friendsGroups/FriendsToggler";
import { scale } from "src/utils/functions/dimensions";
import { Stack, XStack, YStack } from "tamagui";

const FriendsGroupPage = () => {
  const [selected, setSelected] = useState("groups");

  return (
    <YStack
      //   borderWidth={3}
      borderColor={"green"}
      bg={"$background"}
      px={scale(25)}
      //   flex={1}
      pt={scale(15)}
      justify={"space-between"}
      gap={scale(20)}
    >
      <FriendsHeader />
      <FriendsToggler selected={selected} setSelected={setSelected} />
      {selected === "friends" ? <FriendsList /> : null}
    </YStack>
  );
};

export default FriendsGroupPage;
