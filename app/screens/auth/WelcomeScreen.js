import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import ShopButton from "../../components/ShopButton";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceInDown"
            source={{
              uri:
                "https://cdn3.iconfinder.com/data/icons/flat-ecommerce-online-shopping/128/store-01-icon-512.png",
            }}
            resizeMode="contain"
            style={styles.headerLogo}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome To ChatOn,</Text>
        </View>
        <View style={styles.action}>
          <ShopButton
            style={styles.button}
            onButtonPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <MaterialIcons name="navigate-next" color="#fff" size={26} />
          </ShopButton>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  headerContainer: {
    flex: 0.5,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 60,
  },
  headerLogo: {
    width: "100%",
    height: "100%",
  },
  footer: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-around",
  },
  welcomeContainer: {
    margin: 20,
    width: 260,
  },
  welcomeText: {
    fontFamily: "open-sans-bold",
    fontSize: 33,
    color: Colors.titleTextColor,
  },
  action: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    width: 300,
    height: 60,
    flexDirection: "row",
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "open-sans-bold",
  },
});
