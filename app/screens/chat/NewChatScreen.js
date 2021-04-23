import React, { useCallback, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Card from "../../components/Card";
import ShopButton from "../../components/ShopButton";
import ShopInput from "../../components/ShopInput";
import ShopTextBold from "../../components/ShopTextBold";
import ShopLoadingSpinner from "../../components/ShopLoadingSpinner";
import axios from "../../features/axios";

const { width } = Dimensions.get("window");

const NewChatScreen = ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [chatName, setChatName] = useState({ value: "", isValid: false });
  const [isAddingChat, setIsAddingChat] = useState(false);

  const chatNameChangeHandler = useCallback(
    (id, value, isValid) => {
      setChatName({ value, isValid });
    },
    [setChatName]
  );

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
      if (!hasPermission) return;

      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [8, 8],
        quality: 0.2,
      });

      setImageUrl(image.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const addChatRoomHandler = async () => {
    if (!chatName.isValid) {
      Alert.alert("Wrong Input", "Please enter a valid chat name!", [
        { text: "Ok" },
      ]);
      return;
    }

    setIsAddingChat(true);

    let image = null;

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
    }

    await axios.post("/create/chat-room/", {
      title: chatName.value,
      imageUrl: image,
    });

    setChatName({ value: "", isValid: false });
    setImageUrl(null);
    setIsAddingChat(false);
    navigation.goBack();
  };

  return (
    <View style={styles.newChatScreen}>
      <Card style={styles.newChatForm}>
        <TouchableOpacity
          style={styles.chatImageContainer}
          onPress={takeImageHandler}
        >
          {!imageUrl ? (
            <MaterialCommunityIcons
              name="camera-plus-outline"
              color="#000"
              size={60}
            />
          ) : (
            <Image
              style={styles.chatImage}
              source={{
                uri: imageUrl,
              }}
            />
          )}
        </TouchableOpacity>
        <ShopInput
          id="chatName"
          label="Chat Name"
          iconName="group"
          errorText="Invalid chat name"
          initialValue={chatName.value}
          initiallyValid={chatName.isValid}
          onInputChange={chatNameChangeHandler}
          required
          minLength={3}
        />
        <ShopButton style={styles.addButton} onButtonPress={addChatRoomHandler}>
          <ShopTextBold style={styles.addButtonText}>Add</ShopTextBold>
        </ShopButton>
      </Card>
      <ShopLoadingSpinner isVisible={isAddingChat} loadingText="Creating..." />
    </View>
  );
};

export default NewChatScreen;

const styles = StyleSheet.create({
  newChatScreen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  newChatForm: {
    width: width * 0.8,
    alignItems: "center",
    borderRadius: 40,
    paddingVertical: 45,
    paddingHorizontal: 30,
  },
  chatImageContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    marginBottom: 30,
    overflow: "hidden",
  },
  chatImage: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    width: "88%",
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
