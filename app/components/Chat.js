import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import ShopTextBold from "./ShopTextBold";
import ShopText from "./ShopText";

const { width } = Dimensions.get("window");

const Chat = ({ chatId, chatData, messages, navigation }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.chatContainer}>
      <TouchableComponent
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            id: chatId,
            data: { title: chatData.title, imageUrl: chatData.imageUrl },
          })
        }
      >
        <View style={styles.chatWrapper}>
          <Image
            source={
              chatData.imageUrl
                ? {
                    uri: `http://192.168.1.6:80/api/retrieve/image/single?name=${chatData.imageUrl}`,
                  }
                : require("../assets/images/chat-default.png")
            }
            resizeMode="cover"
            style={styles.chatImage}
          />
          <View style={styles.chatDescription}>
            <ShopTextBold style={styles.chatTitle}>
              {chatData.title}
            </ShopTextBold>
            <ShopText style={styles.chatMsg} numberOfLines={1}>
              {messages.length
                ? `${messages[0].user.userName}: ${
                    messages[0].text ? messages[0].text : "image"
                  }`
                : "No messages yet"}
            </ShopText>
          </View>
        </View>
      </TouchableComponent>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chatContainer: {
    width: width,
    height: 80,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
  chatWrapper: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  chatImage: {
    margin: 10,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#ccc",
  },
  chatDescription: {
    flex: 1,
    marginHorizontal: 10,
  },
  chatTitle: {
    fontSize: 18,
  },
  chatMsg: {
    color: "#888",
  },
});
