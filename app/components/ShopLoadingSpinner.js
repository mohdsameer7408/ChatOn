import React from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import Card from "./Card";
import ShopText from "./ShopText";

const ShopLoadingSpinner = ({ isVisible, loadingText }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      statusBarTranslucent
      transparent
    >
      <View style={styles.loadingScreen}>
        <Card style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.primaryColor} />
          <ShopText style={styles.loadingText}>
            {loadingText ? loadingText : "Loading..."}
          </ShopText>
        </Card>
      </View>
    </Modal>
  );
};

export default ShopLoadingSpinner;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContainer: {
    backgroundColor: "#fff",
    height: 64,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  loadingText: {
    marginLeft: 7,
  },
});
