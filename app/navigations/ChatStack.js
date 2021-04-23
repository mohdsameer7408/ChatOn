import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import {
  HeaderButtons,
  HiddenItem,
  Item,
  OverflowMenu,
  OverflowMenuProvider,
} from "react-navigation-header-buttons";
import { Feather } from "@expo/vector-icons";

import ChatsScreen from "../screens/chat/ChatsScreen";
import Colors from "../constants/Colors";
import ShoppableHeaderButton from "../components/ShoppableHeaderButton";
import ChatScreen from "../screens/chat/ChatScreen";
import ChatHeaderTitle from "../components/ChatHeaderTitle";
import NewChatScreen from "../screens/chat/NewChatScreen";

const Stack = createStackNavigator();

const ChatStack = ({ navigation }) => {
  return (
    <OverflowMenuProvider>
      <Stack.Navigator
        initialRouteName="ChatsScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor:
              Platform.OS === "android" ? Colors.primaryColor : "#fff",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          },
          headerTintColor:
            Platform.OS === "android" ? "#fff" : Colors.primaryColor,
          headerTitleStyle: { fontFamily: "open-sans-bold" },
          headerBackTitleStyle: { fontFamily: "open-sans" },
        }}
      >
        <Stack.Screen
          name="ChatsScreen"
          component={ChatsScreen}
          options={({ navigation }) => ({
            headerTitle: "Chats",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={ShoppableHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => navigation.openDrawer()}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <OverflowMenu
                OverflowIcon={
                  <Feather
                    name={
                      Platform.OS === "android"
                        ? "more-vertical"
                        : "more-horizontal"
                    }
                    size={23}
                    color={
                      Platform.OS === "android" ? "#fff" : Colors.primaryColor
                    }
                  />
                }
              >
                <HiddenItem
                  title="New Chat"
                  onPress={() => navigation.navigate("NewChatScreen")}
                />
              </OverflowMenu>
            ),
            headerLeftContainerStyle: { marginLeft: 10 },
            headerRightContainerStyle: { marginRight: 10 },
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route }) => ({
            headerTitle: (props) => (
              <ChatHeaderTitle {...props} data={route.params.data} />
            ),
            headerTitleContainerStyle: { marginLeft: -20 },
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="NewChatScreen"
          component={NewChatScreen}
          options={{ headerTitle: "New Chat Room" }}
        />
      </Stack.Navigator>
    </OverflowMenuProvider>
  );
};

export default ChatStack;
