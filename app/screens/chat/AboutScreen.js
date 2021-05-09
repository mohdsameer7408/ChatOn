import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import ShopTextBold from "../../components/ShopTextBold";
import ShopText from "../../components/ShopText";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");

const AboutScreen = ({ navigation }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.aboutScreen}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
          }}
          style={styles.profileCover}
          resizeMode="cover"
        />
        <View style={styles.profileImageName}>
          <Image
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxvyM87RyvMZY3_7wbC2_aB5iAELtG4EPkHA&usqp=CAU",
            }}
            style={styles.profileImage}
          />
          <ShopTextBold style={styles.profileUserName}>John Smith</ShopTextBold>
        </View>
        <View style={styles.profileBio}>
          <ShopText style={styles.profileBioText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ut
            qui, distinctio enim sunt optio soluta quos corrupti ad ullam
            laudantium mollitia blanditiis obcaecati voluptates inventore culpa
            explicabo consequatur nostrum.
          </ShopText>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableComponent
            style={{ flex: 1 }}
            onPress={() => {}}
            useForeground
          >
            <View style={styles.buttonWrapper}>
              <ShopTextBold style={styles.buttonText}>Join</ShopTextBold>
            </View>
          </TouchableComponent>
        </View>
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  aboutScreen: {
    flex: 1,
    backgroundColor: "#000",
  },
  profileHeader: {
    width,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  profileCover: {
    width: "100%",
    height: 150,
  },
  profileImageName: {
    width: "80%",
    marginTop: -33,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  profileImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 40,
  },
  profileUserName: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 18,
    color: "#fff",
  },
  profileBio: {
    width: "90%",
    marginVertical: 20,
  },
  profileBioText: {
    color: "#fff",
    textAlign: "justify",
  },
  buttonContainer: {
    width: width * 0.24,
    height: 35,
    borderWidth: 2,
    borderColor: Colors.customBlueColor,
    borderRadius: 18,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  buttonWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.customBlueColor,
    fontSize: 16,
  },
});
