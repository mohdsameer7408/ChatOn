import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar } from "react-native-paper";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import IconContainer from "../components/IconContainer";
import ShopTextBold from "../components/ShopTextBold";
import { selectUser, signOutAsync } from "../features/authSlice";
import ShopText from "../components/ShopText";

const { height } = Dimensions.get("window");

const DrawerContent = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeaderContainer}>
        <View style={styles.drawerHeader}>
          <View style={styles.drawerHeaderTop}>
            <ShopTextBold style={styles.headerTitle}>MY PROFILE</ShopTextBold>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileImage}
          onPress={() => props.navigation.navigate("ProfileScreen")}
        >
          <Avatar.Image
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxvyM87RyvMZY3_7wbC2_aB5iAELtG4EPkHA&usqp=CAU",
            }}
            size={70}
          />
        </TouchableOpacity>
        <View style={styles.drawerHeaderBottom}>
          <ShopTextBold style={styles.profileTitle}>
            {user.userName.toUpperCase()}
          </ShopTextBold>
          <ShopText style={styles.profileEmail}>{user.email}</ShopText>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerNavigations}>
            {/* <DrawerItemList {...props} /> */}
            <DrawerItem
              style={styles.drawerItem}
              label="Home"
              labelStyle={{ fontFamily: "open-sans" }}
              icon={({ size, color }) => (
                <IconContainer color="#ffbf00">
                  <AntDesign name="home" color={"#fff"} size={20} />
                </IconContainer>
              )}
              onPress={() => props.navigation.navigate("HomeStack")}
            />
            <DrawerItem
              style={styles.drawerItem}
              label="Chat"
              labelStyle={{ fontFamily: "open-sans" }}
              icon={() => (
                <IconContainer color="#00bfff">
                  <MaterialCommunityIcons
                    name="chat-outline"
                    size={20}
                    color={"#fff"}
                  />
                </IconContainer>
              )}
              onPress={() => props.navigation.navigate("ChatStack")}
            />
            <DrawerItem
              style={styles.drawerItem}
              label="Sign Out"
              labelStyle={{ fontFamily: "open-sans" }}
              icon={() => (
                <IconContainer color="#000">
                  <Ionicons name="ios-log-out" size={20} color={"#fff"} />
                </IconContainer>
              )}
              onPress={() => dispatch(signOutAsync())}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <ImageBackground
        source={require("../assets/images/drawer-footer.jpg")}
        style={styles.footerContainer}
        resizeMode="cover"
      >
        <View style={styles.footerContainerTop}>
          <ShopText> </ShopText>
        </View>
        <View style={styles.footerContainerBottom}>
          <Image
            source={require("../assets/images/drawer-footer.jpg")}
            style={styles.footerContainerBottomImage}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeaderContainer: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.primaryColor,
  },
  drawerHeader: {
    backgroundColor: "#fff",
  },
  drawerHeaderTop: {
    backgroundColor: Colors.primaryColor,
    borderBottomRightRadius: 70,
    height: height * 0.13,
    paddingTop: height * 0.05,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 14,
  },
  profileImage: {
    position: "absolute",
    top: StatusBar.currentHeight + height * 0.084,
    zIndex: 10,
    alignSelf: "center",
  },
  drawerHeaderBottom: {
    paddingTop: 50,
    backgroundColor: "#fff",
    borderTopLeftRadius: 70,
    alignItems: "center",
  },
  profileTitle: {
    fontSize: 20,
  },
  profileEmail: {
    color: "#888",
  },
  drawerContent: {
    flex: 1,
  },
  drawerNavigations: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  drawerItem: {
    width: "75%",
  },
  footerContainer: {
    width: "100%",
    height: 140,
  },
  footerContainerTop: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomRightRadius: 70,
  },
  footerContainerBottom: {
    height: 90,
    backgroundColor: "#fff",
  },
  footerContainerBottomImage: {
    width: "100%",
    height: "100%",
    // borderTopLeftRadius: 70,
  },
});
