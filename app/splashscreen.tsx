import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, StyleSheet, View } from "react-native";
const SplashScreen = () => {
  useEffect(() => {
    const transitionToNextScreen = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.replace("/(tabs)");
    };

    transitionToNextScreen();
  }, []); // Run this effect only once when the component mounts
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://hotpot.ai/designs/thumbnails/splash-screen/12.jpg",
        }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: width,
    height: height,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
