import React from "react";
import { StyleSheet, View } from "react-native";

const IconContainer = ({ children, color }) => {
  return (
    <View style={{ ...styles.iconContainer, backgroundColor: color }}>
      {children}
    </View>
  );
};

export default IconContainer;

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
