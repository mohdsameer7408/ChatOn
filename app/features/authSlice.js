import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "./axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const registerAsync = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/register/", user);
    await saveToAsyncStorage("user", data);
    dispatch(signIn(data));
  } catch (error) {
    throw error;
  }
};

export const signInAsync = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post("/sign-in/", user);
    await saveToAsyncStorage("user", data);
    dispatch(signIn(data));
  } catch (error) {
    throw error;
  }
};

export const signOutAsync = () => async (dispatch) => {
  try {
    await deleteFromAsyncStorage("user");
    dispatch(signOut());
  } catch (error) {
    throw error;
  }
};

export const getFromAsyncStorage = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    throw error;
  }
};

export const saveToAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw error;
  }
};

export const deleteFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
