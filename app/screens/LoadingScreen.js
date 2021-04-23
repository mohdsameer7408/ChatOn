import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
