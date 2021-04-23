import React from "react";
import { StyleSheet, Text } from "react-native";

const ShopText = ({ children, style, ...rest }) => {
  return (
    <Text {...rest} style={{ ...styles.shopText, ...style }}>
      {children}
    </Text>
  );
};

export default ShopText;

const styles = StyleSheet.create({
  shopText: {
    fontFamily: "open-sans",
  },
});
