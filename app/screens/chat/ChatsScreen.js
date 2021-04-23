import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Pusher from "pusher-js/react-native";
import { useDispatch, useSelector } from "react-redux";

import Chat from "../../components/Chat";
import FallbackScreen from "../FallbackScreen";
import ShopLoadingSpinner from "../../components/ShopLoadingSpinner";
import axios from "../../features/axios";
import { selectChatRooms, setRooms } from "../../features/chatRoomSlice";

const pusher = new Pusher("5fd6aca315e754980d30", {
  cluster: "ap2",
});

const ChatsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const chatRooms = useSelector(selectChatRooms);
  const dispatch = useDispatch();

  const fetchChatRooms = useCallback(async () => {
    const { data } = await axios.get("/fetch/chat-rooms/");
    dispatch(setRooms(data));
  }, [dispatch]);

  useEffect(() => {
    fetchChatRooms().then(() => setIsLoading(false));
  }, [fetchChatRooms]);

  useEffect(() => {
    const channel = pusher.subscribe("chatrooms");
    channel.bind("inserted", (_) => {
      fetchChatRooms();
    });
  }, []);

  if (!isLoading && !chatRooms.length) {
    return <FallbackScreen>No chats yet!</FallbackScreen>;
  }

  return isLoading ? (
    <ShopLoadingSpinner isVisible={isLoading} />
  ) : (
    <FlatList
      style={styles.chatScreen}
      data={chatRooms}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Chat
          chatId={item._id}
          chatData={item}
          messages={item.messages}
          navigation={navigation}
        />
      )}
    />
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  chatScreen: {
    backgroundColor: "#fff",
  },
});
