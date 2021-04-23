import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Card from "./Card";
import ShopButton from "./ShopButton";
import ShoppableHeaderButton from "./ShoppableHeaderButton";

const ChatBottom = ({
  message,
  setMessage,
  takeImageHandler,
  messageSendHandler,
  isSendingMessage,
}) => {
  return (
    <View style={styles.chatBottom}>
      <Card style={styles.chatinputContainer}>
        <TextInput
          style={styles.chatInput}
          placeholder="Type a message"
          placeholderTextColor="#f8f8f8"
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <HeaderButtons HeaderButtonComponent={ShoppableHeaderButton}>
          <Item
            title="camera"
            iconName={Platform.OS === "android" ? "md-camera" : "ios-camera"}
            onPress={takeImageHandler}
          />
        </HeaderButtons>
      </Card>
      <ShopButton
        style={styles.sendButton}
        onButtonPress={messageSendHandler}
        disabled={isSendingMessage}
      >
        {isSendingMessage ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <MaterialIcons name="send" color={"#fff"} size={26} />
        )}
      </ShopButton>
    </View>
  );
};

export default ChatBottom;

const styles = StyleSheet.create({
  chatBottom: {
    flex: 0.08,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 3,
  },
  chatinputContainer: {
    backgroundColor: "#9933ff",
    flexDirection: "row",
    width: "85%",
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 5,
    height: 45,
  },
  chatInput: {
    flex: 1,
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 16,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },
});
