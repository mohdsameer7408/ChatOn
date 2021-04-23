import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { selectUser } from "../../features/authSlice";
import ChatMessage from "../../components/ChatMessage";
import FallbackScreen from "../FallbackScreen";
import ChatBottom from "../../components/ChatBottom";
import { selectChatRooms } from "../../features/chatRoomSlice";
import axios from "../../features/axios";

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const user = useSelector(selectUser);
  const rooms = useSelector(selectChatRooms);
  const messages = rooms.find((room) => room._id === route.params.id).messages;

  const verifyPermissions = async () => {
    try {
      const result = await Permissions.askAsync(
        Permissions.MEDIA_LIBRARY,
        Permissions.CAMERA
      );
      if (result.status !== "granted") {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant camera permission to send photos!",
          [{ text: "Ok" }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }

      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [10, 9],
        quality: 0.2,
      });

      setImageUrl(image.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const messageSendHandler = async () => {
    const text = message.trim();
    if (!text && !imageUrl) {
      return;
    }

    setIsSendingMessage(true);
    let image = null;
    try {
      if (imageUrl) {
        const imageName = imageUrl.split("/").pop();
        const imageType = imageName.split(".").pop();

        const imageData = {
          uri: imageUrl,
          name: imageName,
          type: `image/${imageType}`,
        };

        const imageForm = new FormData();
        imageForm.append("file", imageData, imageName);

        const { data } = await axios.post("/upload/image/", imageForm, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-us,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${imageForm._boundary}`,
          },
        });
        image = data.filename;
        setImageUrl(null);
      }
      const data = {
        user: user._id,
        text,
        imageUrl: image,
        timestamp: Date.now(),
      };

      await axios.patch(`/chat-room/create-message/${route.params.id}/`, data);
    } catch (error) {
      Alert.alert("Error", "Something went wrong!", [{ text: "Ok" }]);
    }
    setIsSendingMessage(false);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.chatContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      {messages.length ? (
        <View style={styles.chatMessages}>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}
            inverted
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ChatMessage item={item} user={user._id} />
            )}
          />
        </View>
      ) : (
        <FallbackScreen>
          Start your conversation by sending a message.
        </FallbackScreen>
      )}
      <ChatBottom
        isSendingMessage={isSendingMessage}
        message={message}
        messageSendHandler={messageSendHandler}
        setMessage={setMessage}
        takeImageHandler={takeImageHandler}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatMessages: {
    flex: 0.92,
  },
});
