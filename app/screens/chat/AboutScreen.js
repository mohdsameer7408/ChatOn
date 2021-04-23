import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ShopTextBold from "../../components/ShopTextBold";

const AboutScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#0df2f2", "#80ffff", "#ccffff"]}
      start={{ x: 0.8, y: 0 }}
      end={[0.1, 0]}
      style={styles.aboutScreen}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.4)"]}
        start={{ x: 0.8, y: 0 }}
        end={[0.1, 0.3]}
        style={styles.aboutCard}
      >
        <ShopTextBold>Hello Programmers</ShopTextBold>
      </LinearGradient>
    </LinearGradient>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  aboutScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  aboutCard: {
    width: "80%",
    height: "50%",
    borderRadius: 8,
  },
});
