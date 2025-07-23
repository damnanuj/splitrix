import { scale } from "src/utils/functions/dimensions";
import themeColors from "src/utils/theme/colors";
import { YStack } from "tamagui";

import UserHeader from "src/components/Home/UserHeader";
import RecentBills from "../../components/Home/RecentBills";
import AllTransactions from "src/components/Home/AllTransactions";
import { useState } from "react";
import { useAuthStore } from "src/stores/authStore";

const Homepage = () => {
  // console.log("homepage render");

  const { authData } = useAuthStore();
  // console.log(authData, "-<<<<<<authdata");

  return (
    <YStack
      bg={"$background"}
      flex={1}
      px={scale(20)}
      //   borderWidth={2}
      borderColor={"green"}
      overflow="hidden"
    >
      <UserHeader />
      <RecentBills />
      <AllTransactions />
    </YStack>
  );
};

export default Homepage;
