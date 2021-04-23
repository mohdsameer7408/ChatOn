import { createSlice } from "@reduxjs/toolkit";

export const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState: {
    rooms: [],
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    },
  },
});

export const { setRooms } = chatRoomSlice.actions;

export const selectChatRooms = (state) => state.chatRoom.rooms;

export default chatRoomSlice.reducer;
