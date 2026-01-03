import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import MyText from "src/components/customTabBars/styleComponents/MyText";
import FriendsHeader from "src/features/FriendsGroup/components/FriendsHeader";
import FriendsToggler from "src/features/FriendsGroup/components/FriendsToggler";
import { scale } from "src/utils/functions/dimensions";
import { Button, Stack, XStack, YStack } from "tamagui";
import FriendsList from "src/features/FriendsGroup/components/FriendsList";
import FriendsGroups from "src/features/FriendsGroup/components/FriendsGroups";
import { useRouter } from "expo-router";
import GroupsFriendsSelector from "src/components/common/GroupsFriendsSelector";
import BackButtonWithHeader from "src/components/common/BackButtonWithHeader";

type FriendsGroupPageProps = {
  /**
   * Controls how this screen behaves / what extra UI it shows.
   * - "tab": used inside the Friends tab (default)
   * - "selectForBill": used when selecting friends/groups for a bill flow
   */
  mode?: "tab" | "selectForBill";
};

const FriendsGroupPage = ({ mode = "tab" }: FriendsGroupPageProps) => {
  const [selected, setSelected] = useState("groups");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const router = useRouter();
  const isTab = mode === "tab";
  const isSelectForBill = mode === "selectForBill";

  const handleAddNew = () => {
    if (selected === "groups") {
      router.push("/addNewGroup");
    } else {
      router.push("/addNewFriend");
    }
  };

  // Handle Android hardware back button when the selector sheet is open
  useEffect(() => {
    // Only attach handler when we're in the split flow AND sheet is open
    if (!isSelectForBill || !selectorOpen) {
      return;
    }

    const onBackPress = () => {
      setSelectorOpen(false);
      return true; // prevent default back navigation
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      subscription.remove();
    };
  }, [isSelectForBill, selectorOpen]);

  return (
    <>
      <YStack
        bg={"$background"}
        flex={1}
        px={scale(25)}
        borderColor={"green"}
        overflow="hidden"
        gap={scale(20)}
      >
        {isSelectForBill ? (
          <BackButtonWithHeader title="Split expense with" />
        ) : (
          <FriendsHeader />
        )}
        <FriendsToggler selected={selected} setSelected={setSelected} />
        <XStack justify={"space-between"} items={"center"}>
          <MyText color={"$textPrimary"} fontSize={scale(16)}>
            {selected === "groups" ? "All Groups" : "All Friends"}
          </MyText>
          {isTab && (
            <MyText
              color={"$accentYellow"}
              onPress={handleAddNew}
              pressStyle={{ opacity: 0.6 }}
            >
              {selected === "groups" ? "+ Add New Group" : "+ Add New Friend"}
            </MyText>
          )}
        </XStack>
        {selected === "friends" ? <FriendsList /> : <FriendsGroups />}
      </YStack>

      {isSelectForBill && (
        <Stack
          px={scale(24)}
          py={scale(16)}
          borderTopWidth={1}
          borderColor="$backgroundSecondary"
          bg="$background"
        >
          <Button
            onPress={() => setSelectorOpen(true)}
            bg="$accentYellow"
            color="$accentBlack"
            fontSize={scale(16)}
            fontWeight="600"
            height={scale(56)}
            rounded={scale(16)}
            pressStyle={{ opacity: 0.85 }}
          >
            Split Expense
          </Button>
        </Stack>
      )}

      {isSelectForBill && (
        <GroupsFriendsSelector
          open={selectorOpen}
          onOpenChange={setSelectorOpen}
        />
      )}
    </>
  );
};

export default FriendsGroupPage;
