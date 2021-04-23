import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import AuthStack from "./AuthStack";
import SplashScreen from "../screens/SplashScreen";
import { selectUser } from "../features/authSlice";
import { StatusBar } from "react-native";
import ShopDrawer from "./ShopDrawer";

const ShoppableNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);

  if (isLoading) {
    return <SplashScreen setIsLoading={setIsLoading} />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        animated
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.01)"
      />
      {!user ? <AuthStack /> : <ShopDrawer />}
    </NavigationContainer>
  );
};

export default ShoppableNavigator;
