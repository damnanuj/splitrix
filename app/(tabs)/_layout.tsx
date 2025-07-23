import { Tabs } from "expo-router";
import BottomTabBar from "src/components/customTabBars/BottomTabBar";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      // screenOptions={{
      //   tabBarActiveTintColor: theme.red10.val,
      //   tabBarStyle: {
      //     backgroundColor: theme.background.val,
      //     borderTopColor: theme.borderColor.val,
      //   },
      // }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          headerShown: false,
          title: "Groups",
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          headerShown: false,
          title: "Activity",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
