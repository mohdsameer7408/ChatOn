import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { useSelector } from "react-redux";

import ShopText from "../../components/ShopText";
import ShopTextBold from "../../components/ShopTextBold";
import { selectUser } from "../../features/authSlice";

const { width, height } = Dimensions.get("window");

const albumData = [
  {
    id: 1,
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpbYx2F4NipLWskoij7mJPy-imO5PCEzwPRWYlWLlRHrKO-zfVHLTjX2M-6VxG_2QUuoA&usqp=CAU",
  },
  {
    id: 2,
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDyAxe-GkPJ5RJwrUMHiNlsbcdNPx_fkaQg&usqp=CAU",
  },
  {
    id: 3,
    imageUri: "https://avatarfiles.alphacoders.com/512/51268.jpg",
  },
  {
    id: 4,
    imageUri: "https://avatarfiles.alphacoders.com/123/thumb-123601.png",
  },
  {
    id: 5,
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAjkmhhK_RTPpapAyzudgbI6Sv88REXLSclf5wLEVNCRZ1kJtKcW4jscaJNj9DtEwTwPA&usqp=CAU",
  },
  {
    id: 6,
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8ny7wTH06mpRyc2pBrdsICTLmN-oi3vfJg&usqp=CAU",
  },
];

const ProfileScreen = () => {
  const user = useSelector(selectUser);

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.profileScreen}>
      <View style={styles.profileScreenTop}>
        <View style={styles.profileDetails}>
          <Image
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxvyM87RyvMZY3_7wbC2_aB5iAELtG4EPkHA&usqp=CAU",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileDescriptionContainer}>
            <ShopTextBold style={styles.profileName}>
              {user.userName.toUpperCase()}
            </ShopTextBold>
            <View style={styles.socialLinksContainer}>
              <ShopText style={styles.socialLink}>@{user.userName}</ShopText>
              <ShopText
                style={{ ...styles.socialLink, ...styles.facebookLink }}
              >
                #{user.userName}
              </ShopText>
            </View>
          </View>
        </View>
        <View style={styles.profileStatsContainer}>
          <View style={styles.statContainer}>
            <ShopTextBold style={styles.statValueText}>5.7K</ShopTextBold>
            <ShopText style={styles.statTitleText}>Followers</ShopText>
          </View>
          <View style={styles.statContainer}>
            <ShopTextBold style={styles.statValueText}>989</ShopTextBold>
            <ShopText style={styles.statTitleText}>Following</ShopText>
          </View>
          <View style={styles.editProfileButton}>
            <TouchableComponent style={{ flex: 1 }} useForeground>
              <View style={styles.editProfileButtonWrapper}>
                <ShopTextBold style={styles.statValueText}>
                  Edit Profile
                </ShopTextBold>
              </View>
            </TouchableComponent>
          </View>
        </View>
      </View>
      <View style={styles.profileScreenBottom}>
        <ShopTextBold style={styles.albumTitle}>My Albums</ShopTextBold>
        <FlatList
          contentContainerStyle={styles.albumList}
          data={albumData}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image
                source={{ uri: item.imageUri }}
                style={styles.albumImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    backgroundColor: "#3556AB",
  },
  profileScreenTop: {
    flex: 0.3,
  },
  profileDetails: {
    marginVertical: height * 0.02,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 40,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileDescriptionContainer: {
    marginLeft: 30,
    justifyContent: "center",
  },
  profileName: {
    color: "#fff",
    fontSize: 23,
  },
  socialLinksContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  socialLink: {
    color: "#A7BFFF",
  },
  facebookLink: {
    marginLeft: 20,
  },
  profileStatsContainer: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statContainer: {
    alignItems: "center",
  },
  statValueText: {
    color: "#fff",
    fontSize: 17,
  },
  statTitleText: {
    color: "#bbb",
  },
  editProfileButton: {},
  editProfileButtonWrapper: {
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 6,
  },
  profileScreenBottom: {
    flex: 0.7,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    padding: 20,
  },
  albumTitle: {
    fontSize: 18,
  },
  albumList: {
    marginVertical: 20,
    alignItems: "center",
  },
  albumImage: {
    width: width * 0.25,
    height: 110,
    margin: 12,
    borderRadius: 10,
  },
});
