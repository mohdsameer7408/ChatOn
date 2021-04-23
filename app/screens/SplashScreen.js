import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getFromAsyncStorage, signIn } from "../features/authSlice";
import LoadingScreen from "./LoadingScreen";

const SplashScreen = ({ setIsLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getFromAsyncStorage("user");
        if (!user) {
          setIsLoading(false);
          return;
        }
        dispatch(signIn(user));
      } catch (error) {
        console.log("User Error: ", error);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [setIsLoading]);

  return <LoadingScreen />;
};

export default SplashScreen;
