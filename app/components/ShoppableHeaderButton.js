import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import Colors from "../constants/Colors";

const ShoppableHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={26}
      color={Platform.OS === "android" ? "#fff" : Colors.primaryColor}
    />
  );
};

export default ShoppableHeaderButton;
