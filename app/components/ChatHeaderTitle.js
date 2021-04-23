import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

import ShopTextBold from "./ShopTextBold";

const ChatHeaderTitle = ({ data }) => {
  return (
    <View style={styles.chatHeaderTitle}>
      <Image
        source={
          data.imageUrl
            ? {
                uri: `http://192.168.1.6:80/api/retrieve/image/single?name=${data.imageUrl}`,
              }
            : require("../assets/images/chat-default.png")
        }
        style={styles.chatImage}
        resizeMode="cover"
      />
      <ShopTextBold style={styles.chatTitleText}>{data.title}</ShopTextBold>
    </View>
  );
};

export default ChatHeaderTitle;

const styles = StyleSheet.create({
  chatHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  chatTitleText: {
    marginHorizontal: 8,
    color: Platform.OS === "android" ? "#fff" : Colors.primaryColor,
    fontSize: 20,
  },
});
