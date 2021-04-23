import React, { useCallback, useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import ShopText from "../../components/ShopText";
import ShopTextBold from "../../components/ShopTextBold";
import ShopInput from "../../components/ShopInput";
import ShopButton from "../../components/ShopButton";
import { UPDATE_FORM, fromReducer } from "../../features/formReducer";
import { signInAsync } from "../../features/authSlice";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [signingIn, setSigningIn] = useState(false);
  const [{ values, validities, isFormValid }, dispatchFormState] = useReducer(
    fromReducer,
    {
      values: {
        email: "",
        password: "",
      },
      validities: {
        email: false,
        password: false,
      },
      isFormValid: false,
    }
  );

  const onInputChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: UPDATE_FORM,
        payload: {
          id,
          value,
          isValid,
        },
      });
    },
    [dispatchFormState]
  );

  const formSubmitHandler = useCallback(async () => {
    if (!isFormValid) {
      Alert.alert("Wrong Input", "Please check for errors in the form!", [
        { text: "Ok" },
      ]);
      return;
    }
    try {
      setSigningIn(true);
      await dispatch(
        signInAsync({ email: values.email, password: values.password })
      );
    } catch (error) {
      setSigningIn(false);
      Alert.alert("Something went wrong", error.response.data, [
        { text: "Ok" },
      ]);
    }
  }, [values, validities, isFormValid, dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ShopTextBold style={styles.welcomeText}>Welcome</ShopTextBold>
        <ShopTextBold style={styles.loginText}>
          Login to access your account
        </ShopTextBold>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Card style={styles.card}>
          <ShopInput
            id="email"
            label="Email"
            initialValue={values.email}
            initiallyValid={validities.email}
            errorText="Invalid Email!"
            iconName="user"
            required
            email
            autoCapitalize="none"
            onInputChange={onInputChangeHandler}
          />
          <ShopInput
            id="password"
            label="Password"
            initialValue={values.password}
            initiallyValid={validities.password}
            errorText="Invalid Password!"
            iconName="lock"
            required
            minLength={4}
            autoCapitalize="none"
            onInputChange={onInputChangeHandler}
            onSubmitEditing={formSubmitHandler}
          />
          <ShopButton style={styles.button} onButtonPress={formSubmitHandler}>
            {signingIn ? (
              <ActivityIndicator size="small" color={Colors.primaryColor} />
            ) : (
              <ShopTextBold style={styles.buttonText}>Sign In</ShopTextBold>
            )}
          </ShopButton>
        </Card>
        <View style={styles.signupContainer}>
          <ShopText style={styles.signupText}>
            Don't have an account?{" "}
            <Text
              style={{ color: Colors.textColor }}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Sign Up
            </Text>
          </ShopText>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  header: {
    flex: 0.35,
    justifyContent: "center",
    paddingLeft: 30,
  },
  welcomeText: {
    fontSize: 30,
    color: "#fff",
  },
  loginText: {
    color: "#fff",
    marginTop: 10,
  },
  footer: {
    flex: 0.65,
    backgroundColor: Colors.footerColor,
    borderTopRightRadius: 400,
    alignItems: "center",
  },
  card: {
    marginTop: -70,
    borderRadius: 40,
    width: width * 0.8,
    paddingVertical: 45,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    width: "88%",
    height: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  signupContainer: {
    marginTop: 30,
  },
  signupText: {
    color: "#fff",
    fontSize: 15,
  },
});
