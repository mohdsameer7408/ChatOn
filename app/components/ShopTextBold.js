import React from "react";
import { StyleSheet, Text } from "react-native";

const ShopTextBold = ({ children, style }) => {
  return <Text style={{ ...styles.shopTextBold, ...style }}>{children}</Text>;
};

export default ShopTextBold;

const styles = StyleSheet.create({
  shopTextBold: {
    fontFamily: "open-sans-bold",
  },
});
