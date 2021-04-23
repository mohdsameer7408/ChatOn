import React, { useCallback, useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import ShopText from "../../components/ShopText";
import ShopTextBold from "../../components/ShopTextBold";
import ShopInput from "../../components/ShopInput";
import ShopButton from "../../components/ShopButton";
import { registerAsync } from "../../features/authSlice";
import { UPDATE_FORM, fromReducer } from "../../features/formReducer";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [signingUp, setSigningUp] = useState(false);
  const [{ values, validities, isFormValid }, dispatchFormState] = useReducer(
    fromReducer,
    {
      values: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validities: {
        email: false,
        password: false,
        confirmPassword: false,
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
    if (values.password !== values.confirmPassword) {
      Alert.alert(
        "Passwords don't match",
        "Please check for password and confirm password they need to be same for registration!",
        [{ text: "Ok" }]
      );
      return;
    }
    try {
      setSigningUp(true);
      await dispatch(
        registerAsync({ email: values.email, password: values.password })
      );
    } catch (error) {
      setSigningUp(false);
      Alert.alert("Something went wrong", error.response.data, [
        { text: "Ok" },
      ]);
    }
  }, [values, validities, isFormValid, dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <ShopTextBold style={styles.registerText}>Register</ShopTextBold>
        <ShopTextBold style={styles.signupText}>
          Create a new account
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
          />
          <ShopInput
            id="confirmPassword"
            label="Confirm Password"
            initialValue={values.confirmPassword}
            initiallyValid={validities.confirmPassword}
            errorText="Invalid Password!"
            iconName="lock"
            required
            minLength={4}
            autoCapitalize="none"
            onInputChange={onInputChangeHandler}
            onSubmitEditing={formSubmitHandler}
          />
          <ShopButton style={styles.button} onButtonPress={formSubmitHandler}>
            {signingUp ? (
              <ActivityIndicator size="small" color={Colors.primaryColor} />
            ) : (
              <ShopTextBold style={styles.buttonText}>Sign Up</ShopTextBold>
            )}
          </ShopButton>
        </Card>
        <View style={styles.loginContainer}>
          <ShopText style={styles.loginText}>
            Already have account?{" "}
            <Text
              style={{ color: Colors.textColor }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Sign In
            </Text>
          </ShopText>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    height: height + StatusBar.currentHeight,
    backgroundColor: Colors.primaryColor,
  },
  container: {
    // flex: 1,
    height: "100%",
  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    // paddingVertical: height * 0.12,
    paddingLeft: 30,
  },
  registerText: {
    fontSize: 30,
    color: "#fff",
  },
  signupText: {
    color: "#fff",
    marginTop: 10,
  },
  footer: {
    flex: 0.7,
    // height: height * 0.75,
    backgroundColor: Colors.footerColor,
    borderTopLeftRadius: 400,
    alignItems: "center",
  },
  card: {
    marginTop: -60,
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
  loginContainer: {
    marginTop: 30,
  },
  loginText: {
    color: "#fff",
    fontSize: 15,
  },
});
