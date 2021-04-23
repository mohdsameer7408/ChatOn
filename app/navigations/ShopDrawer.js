import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";

import HomeStack from "./HomeStack";
import DrawerContent from "./DrawerContent";
import Colors from "../constants/Colors";
import ChatStack from "./ChatStack";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

const ShopDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
        labelStyle: { fontFamily: "open-sans" },
      }}
      drawerStyle={{
        width: width * 0.75,
      }}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="ChatStack" component={ChatStack} />
    </Drawer.Navigator>
  );
};

export default ShopDrawer;
