import { TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Feather from "@expo/vector-icons/Feather";

import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, View } from "tamagui";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "src/utils/functions/dimensions";

const PRIMARY_COLOR = "#130057";
const BACKGROUND_COLOR = "#000";
const SECONDARY_COLOR = "#fff";
const YELLOW_COLOR = "#ffc23f";

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const filterdRoutes = state.routes.filter((item) => item.name !== "setting");
  // console.log(filterdRoutes);

  const fth = false;

  const theme = useTheme();

  return (
    <BlurView
      intensity={20}
      style={[
        styles.container,
        { backgroundColor: theme.backgroundSecondary.val, overflow: "hidden" },
      ]}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.23)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.shine}
      />
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;
        // console.log(route.name, "routename");
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
                isFocused ? YELLOW_COLOR : theme.textPrimary.val
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
    justifyContent: "space-evenly",
    alignItems: "center",

    zIndex: 999,
    width: "100%",
    height: scale(80),

    alignSelf: "center",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
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
    width: 150,
    height: "100%",
    borderTopLeftRadius: 30,
    backgroundColor: "transparent",
  },

  tabItemWrapper: {
    // borderWidth: 1,
    height: 43,
    borderRadius: 30,
    overflow: "hidden",
    // marginHorizontal: 5,
    flexShrink: 1,
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
    zIndex: 10,
  },

  text: {
    textTransform: "capitalize",

    marginLeft: 8,
    fontWeight: "500",
  },
});

export default BottomTabBar;
