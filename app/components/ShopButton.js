import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";

const ShopButton = ({
  style,
  gradientColors,
  children,
  onButtonPress,
  ...rest
}) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.buttonContainer, ...style }}>
      <TouchableComponent
        useForeground
        onPress={onButtonPress}
        style={{ flex: 1 }}
        {...rest}
      >
        <LinearGradient
          colors={
            gradientColors
              ? gradientColors
              : [Colors.primaryColor, "#9933ff", "#b366ff"]
          }
          style={{
            ...styles.button,
            flexDirection: style.flexDirection ? style.flexDirection : "column",
          }}
        >
          {children}
        </LinearGradient>
      </TouchableComponent>
    </View>
  );
};

export default ShopButton;

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#9933ff",
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
