import React from "react";
import { StyleSheet, View } from "react-native";

import ShopText from "../components/ShopText";

const FallbackScreen = ({ children }) => {
  return (
    <View style={styles.fallbackContainer}>
      <ShopText style={styles.fallbackText}>{children}</ShopText>
    </View>
  );
};

export default FallbackScreen;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "#888",
    fontSize: 16,
  },
});
