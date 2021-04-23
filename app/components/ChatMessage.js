import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import moment from "moment";

import ShopText from "./ShopText";
import ShopTextBold from "./ShopTextBold";

const { width } = Dimensions.get("window");

const ChatMessage = ({ item, user }) => {
  return (
    <View style={styles.chatMessageContainer}>
      <View
        style={[
          styles.chatMessage,
          user === item.user._id && styles.chatMessageSender,
        ]}
      >
        <ShopTextBold style={styles.chatMessageUser}>
          {item.user.userName}
        </ShopTextBold>
        {item.text !== "" && (
          <ShopText style={styles.chatMessageText}>{item.text}</ShopText>
        )}
        {item.imageUrl && (
          <Image
            source={{
              uri: `http://192.168.1.6:80/api/retrieve/image/single?name=${item.imageUrl}`,
            }}
            style={styles.chatMessageImage}
            resizeMode="contain"
          />
        )}
        <ShopText style={styles.chatMessageTimestamp}>
          {moment(item.timestamp).format("MMM Do YYYY, HH:mm")}
        </ShopText>
      </View>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  chatMessageContainer: {
    width: width - 20,
    alignItems: "flex-start",
  },
  chatMessage: {
    padding: 7,
    backgroundColor: "#b366ff",
    maxWidth: "88%",
    borderRadius: 8,
    marginBottom: 5,
  },
  chatMessageSender: {
    alignSelf: "flex-end",
    backgroundColor: "#9933ff",
  },
  chatMessageUser: {
    color: "#fff",
    marginBottom: 3,
  },
  chatMessageText: {
    fontSize: 15,
    color: "#f8f8f8",
  },
  chatMessageImage: {
    width: 250,
    height: 250,
    marginVertical: 5,
  },
  chatMessageTimestamp: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#f8f8f8",
    marginTop: 2,
  },
});
