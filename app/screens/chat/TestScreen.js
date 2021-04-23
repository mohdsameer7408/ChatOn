import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import ShopTextBold from "../../components/ShopTextBold";

const colors = ["red", "tomato", "blue", "green", "violet", "purple"];

const TestScreen = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.testScreen}>
      {Array(6)
        .fill()
        .map((_, index) => (
          <View style={styles.card} key={index}>
            <TouchableComponent
              style={{ flex: 1 }}
              onPress={() => setIsBottomSheetVisible(true)}
            >
              <View
                style={{
                  ...styles.cardWrapper,
                  backgroundColor: colors[index],
                }}
              >
                <ShopTextBold style={styles.cardText}>JavaScript</ShopTextBold>
              </View>
            </TouchableComponent>
          </View>
        ))}
      <Modal
        visible={isBottomSheetVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
      >
        <View style={styles.bottomSheetContainer}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setIsBottomSheetVisible(false)}
          ></Pressable>
          <View
            style={styles.bottomSheet}
            onPress={() => setIsBottomSheetVisible(false)}
          >
            <ShopTextBold>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
              quos molestiae perferendis. Cupiditate explicabo amet tempore iure
              possimus unde dolorum neque porro earum nemo adipisci nam minus,
              doloribus aliquid veritatis. Fuga nulla beatae eos et deleniti
              vero ipsum quidem repellendus aspernatur? Officia sit, harum minus
              natus vitae exercitationem doloremque eaque.
            </ShopTextBold>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  testScreen: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  card: {
    width: "90%",
    height: 70,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowOpacity: 0.26,
    elevation: 8,
    overflow: "hidden",
  },
  cardWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 17,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomSheet: {
    width: "100%",
    height: 270,
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 10,
    },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 8,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
    overflow: "hidden",
    padding: 20,
  },
});
