import { TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "tamagui";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
import { LinearGradient } from "expo-linear-gradient";

const PRIMARY_COLOR = "#130057";
const BACKGROUND_COLOR = "#000";
const SECONDARY_COLOR = "#fff";
const YELLOW_COLOR = "#ffc23f";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurView intensity={20} style={[styles.container, { overflow: "hidden" }]}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.23)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.shine}
      />
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={styles.tabItemWrapper}
          >
            {isFocused ? (
              <BlurView
                intensity={80}
                tint="dark"
                style={styles.focusedBlurBackground}
              />
            ) : null}

            <View style={styles.tabItemContent}>
              {getIconByRouteName(
                route.name,
                isFocused ? YELLOW_COLOR : SECONDARY_COLOR
              )}
              {isFocused && (
                <Animated.Text
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                  style={[
                    styles.text,
                    {
                      color: YELLOW_COLOR,
                    },
                  ]}
                >
                  {label as string}
                </Animated.Text>
              )}
            </View>
          </AnimatedTouchableOpacity>
        );
      })}
    </BlurView>
  );

  //    <Ionicons name="home-outline" size={18} color={color} />;
  //    <Ionicons name="home=" size={18} color={color} />;

  //   <Feather name="users" size={18} color={color} />;
  // <FontAwesome5 name="user-friends" size={18} color={color} />;

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case "index":
        return <Ionicons name="home-outline" size={18} color={color} />;
      case "friends":
        return <Feather name="users" size={18} color={color} />;
      case "activity":
        return <Feather name="activity" size={18} color={color} />;
      case "profile":
        return (
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color={color}
          />
        );
      default:
        return <Feather name="home" size={18} color={color} />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    zIndex: 999,
    width: "100%",
    height: 80,

    alignSelf: "center",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.55)",
    borderTopWidth: 0.3,
    borderRightWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150, // Adjust width for size of shine
    height: "100%",
    borderTopLeftRadius: 30,
    backgroundColor: "transparent",
  },

  tabItemWrapper: {
    height: 43,
    borderRadius: 30,
    overflow: "hidden",
    marginHorizontal: 5,
  },

  focusedBlurBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    // backgroundColor: 'rgba(0, 0, 0, 0.31)',
  },

  tabItemContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 20,
    zIndex: 10, // ensure content is above blur
  },

  text: {
    textTransform: "capitalize",
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default CustomTabBar;
