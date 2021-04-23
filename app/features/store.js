import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatRoomReducer from "./chatRoomSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    chatRoom: chatRoomReducer,
  },
});
