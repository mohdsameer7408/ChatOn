import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import Colors from "../constants/Colors";
import ShopTextBold from "./ShopTextBold";

const INPUT_CHANGE = "INPUT_CHANGE";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      const { value, isValid } = action.payload;
      return {
        ...state,
        value,
        isValid,
        touched: true,
      };
    default:
      return state;
  }
};

const ShopInput = ({
  id,
  label,
  initialValue,
  initiallyValid,
  errorText,
  iconName,
  onInputChange,
  required,
  email,
  min,
  max,
  minLength,
  ...rest
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isInputBlur, setIsInputBlur] = useState(false);
  const [{ value, isValid, touched }, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid ? initiallyValid : false,
    touched: false,
  });

  useEffect(() => {
    onInputChange(id, value, isValid);
  }, [id, value, isValid, touched, onInputChange]);

  const onValueChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min !== null && +text < min) {
      isValid = false;
    }
    if (max !== null && +text > max) {
      isValid = false;
    }
    if (minLength !== null && text.length < minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGE,
      payload: {
        value: text,
        isValid,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ShopTextBold style={styles.label}>{label}</ShopTextBold>
      <View
        style={[
          styles.inputContainer,
          isInputBlur && !isValid && styles.inputContainerError,
        ]}
      >
        <FontAwesome
          name={iconName}
          color="grey"
          size={23}
          style={styles.inputIcon}
        />
        <TextInput
          {...rest}
          value={value}
          onChangeText={onValueChangeHandler}
          style={styles.input}
          placeholder={label}
          secureTextEntry={
            label.includes("Password") ? passwordVisibility : false
          }
          onBlur={() => setIsInputBlur(true)}
        />
        {!label.includes("Password") ? (
          isValid && (
            <Animatable.View animation="bounceIn" delay={5} style={styles.icon}>
              <Feather
                name="check-circle"
                color={Colors.secondaryDarkColor}
                size={23}
              />
            </Animatable.View>
          )
        ) : (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setPasswordVisibility((prevState) => !prevState)}
          >
            <Feather
              name={`${passwordVisibility ? "eye-off" : "eye"}`}
              color={Colors.customGreyColor}
              size={23}
            />
          </TouchableOpacity>
        )}
      </View>
      {touched && !isValid && (
        <Animatable.Text animation="lightSpeedIn" style={styles.errorText}>
          {errorText}
        </Animatable.Text>
      )}
    </View>
  );
};

export default ShopInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: Colors.customGreyColor,
  },
  inputContainer: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainerError: {
    borderColor: "#e80000",
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: "open-sans",
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "#e80000",
  },
});
