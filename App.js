import "react-native-gesture-handler";
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { LogBox } from "react-native";

import ShoppableNavigator from "./app/navigations/ShoppableNavigator";
import store from "./app/features/store";

enableScreens();

const fetchFonts = () =>
  Font.loadAsync({
    "open-sans": require("./app/assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./app/assets/fonts/OpenSans-Bold.ttf"),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  LogBox.ignoreLogs(["Setting a timer"]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShoppableNavigator />
    </Provider>
  );
}
