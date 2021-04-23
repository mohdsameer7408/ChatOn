import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Card from "./Card";
import Colors from "../constants/Colors";
import ShopText from "./ShopText";

const { width, height } = Dimensions.get("window");

const ShoppableBottomTab = () => {
  return (
    <Card style={styles.bottomTab}>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.tab}>
          <MaterialIcons
            name="person-outline"
            size={25}
            color={Colors.primaryColor}
          />
          <ShopText>My Account</ShopText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.tab}>
          <MaterialIcons
            name="phone-iphone"
            size={25}
            color={Colors.primaryColor}
          />
          <ShopText>Recharge</ShopText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.tab}>
          <Ionicons name="md-gift" size={25} color={Colors.primaryColor} />
          <ShopText>Vi Tuesdays</ShopText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.tab}>
          <Ionicons name="md-menu" size={25} color={Colors.primaryColor} />
          <ShopText>Menu</ShopText>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ShoppableBottomTab;

const styles = StyleSheet.create({
  bottomTab: {
    position: "absolute",
    bottom: 20,
    width: width * 0.9,
    height: height * 0.09,
    borderRadius: height * 0.1,
    overflow: "hidden",
    paddingHorizontal: width * 0.04,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
  },
});
