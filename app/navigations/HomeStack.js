import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";

import ShopHomeScreen from "../screens/chat/ShopHomeScreen";
import Colors from "../constants/Colors";
import ShoppableHeaderButton from "../components/ShoppableHeaderButton";
import { signOutAsync } from "../features/authSlice";
import ProfileScreen from "../screens/chat/ProfileScreen";
import AboutScreen from "../screens/chat/AboutScreen";
import TestScreen from "../screens/chat/TestScreen";

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      initialRouteName="ShopHomeScreen"
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? Colors.primaryColor : "#fff",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        headerTintColor:
          Platform.OS === "android" ? "#fff" : Colors.primaryColor,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitleStyle: { fontFamily: "open-sans" },
      }}
    >
      <Stack.Screen
        name="ShopHomeScreen"
        component={ShopHomeScreen}
        options={{
          headerTitle: "Shoppable",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={ShoppableHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.openDrawer()}
              />
            </HeaderButtons>
          ),
          headerLeftContainerStyle: { marginLeft: 10 },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ShoppableHeaderButton}>
              <Item
                title="LogOut"
                iconName="ios-log-out"
                onPress={() => dispatch(signOutAsync())}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#3556AB" },
        }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#000" },
        }}
      />
      <Stack.Screen name="TestScreen" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
