import { ScrollView, Stack, Switch, useTheme, XStack, YStack } from "tamagui";
import MyText from "../customTabBars/styleComponents/MyText";
import { scale } from "src/utils/functions/dimensions";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { SwitchUnstyledDemo } from "./Switch";
const Settings = () => {
  return (
    <YStack
      //   borderWidth={1}
      mt={scale(15)}
      //   gap={scale(15)}
      flex={1}
      borderColor={"white"}
    >
      <MyText>Settings</MyText>

      <YStack
        //   borderWidth={1}
        borderColor={"red"}
        flex={1}
        pb={scale(80)}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            //   borderWidth: 1,
            borderColor: "green",
            // gap: scale(15),
          }}
        >
          {settingItems.map((bill, idx) => (
            <SettingsItem
              key={idx}
              iconColor={bill.iconColor}
              icon={bill.icon}
              title={bill.title}
            />
          ))}
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default Settings;

const SettingsItem = ({ icon, title, iconColor }: any) => {
  const theme = useTheme();
  return (
    <XStack
      borderBottomWidth={1}
      borderColor={"$backgroundSecondary"}
      gap={scale(20)}
      items="center"
      py={scale(20)}
      //   mb={scale(30)}
    >
      <Stack
        bg={"$backgroundSecondary"}
        width={55}
        height={55}
        rounded={scale(10)}
        justify="center"
        items="center"
      >
        <Feather name={icon} size={25} color={iconColor} />
      </Stack>

      <Stack flex={1}>
        <MyText
          color={"$textPrimary"}
          //   fontSize={scale(16)}
          style={{ fontFamily: "MPlusRounded700" }}
        >
          {title}
        </MyText>
      </Stack>

      {icon === "moon" ? (
        <SwitchUnstyledDemo />
      ) : (
        <Stack borderColor={"red"}>
          <Entypo
            name="chevron-right"
            size={24}
            color={theme.textSecondary.val}
          />
        </Stack>
      )}
    </XStack>
  );
};

const settingItems = [
  {
    icon: "user",
    title: "Edit Profile",

    iconColor: "#f1c40f",
  },
  {
    icon: "activity",
    title: "Transaction History",

    iconColor: "#2ecc71",
  },
  {
    icon: "moon",
    title: "Dark Mode",

    iconColor: "#3498db",
  },
  {
    icon: "headphones",
    title: "Help & Support",

    iconColor: "#9b59b6",
  },
  //   {
  //     icon: "wifi",
  //     title: "WiFi Recharge",

  //     iconColor: "#e74c3c", // red
  //   },
  //   {
  //     icon: "phone",
  //     title: "Mobile Bill",

  //     iconColor: "#1abc9c", // teal
  //   },
  //   {
  //     icon: "coffee",
  //     title: "Cafe Snacks",

  //     iconColor: "#e67e22", // orange
  //   },
  //   {
  //     icon: "gift",
  //     title: "Gift Shopping",

  //     iconColor: "#ff6b81", // pink
  //   },
  //   {
  //     icon: "globe",
  //     title: "Domain Renewal",

  //     iconColor: "#16a085", // emerald
  //   },
  //   {
  //     icon: "briefcase",
  //     title: "Coworking Rent",

  //     iconColor: "#34495e", // dark gray
  //   },
];
