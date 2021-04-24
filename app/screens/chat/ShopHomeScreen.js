import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Image, Button } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import ShopLoadingSpinner from "../../components/ShopLoadingSpinner";
import ShoppableBottomTab from "../../components/ShoppableBottomTab";

const { width, height } = Dimensions.get("window");

const ShopHomeScreen = ({ navigation }) => {
  const [images, setImages] = useState([
    {
      id: "1",
      url: "https://coverfiles.alphacoders.com/440/44011.png",
    },
    {
      id: "2",
      url:
        "https://assets.visme.co/templates/banners/thumbnails/i_Do-or-Do-Not-LinkedIn-Header_thumb.jpg",
    },
    {
      id: "3",
      url: "https://coverfiles.alphacoders.com/786/78601.jpg",
    },
  ]);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderCarouselImage = ({ item }) => (
    <Image
      style={styles.carouselImage}
      source={{ uri: item.url }}
      resizeMode="contain"
    />
  );

  const displayLoading = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        <Carousel
          autoplay
          loop
          enableSnap
          useScrollView
          enableMomentum={false}
          lockScrollWhileSnapping
          data={images}
          renderItem={renderCarouselImage}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => setActiveCarouselIndex(index)}
        />
        <Pagination
          containerStyle={styles.dotsContainer}
          dotsLength={images.length}
          activeDotIndex={activeCarouselIndex}
        />
      </View>
      <Button
        title="open"
        onPress={() => navigation.navigate("ProfileScreen")}
      />
      <Button
        title="About"
        onPress={() => navigation.navigate("AboutScreen")}
      />
      <Button title="Test" onPress={() => navigation.navigate("TestScreen")} />
      <Button title="Test" onPress={() => navigation.navigate("TestScreen")} />

      <ShoppableBottomTab />
      <ShopLoadingSpinner isVisible={isModalVisible} />
    </View>
  );
};

export default ShopHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  carousel: {
    height: height * 0.18,
    alignItems: "center",
  },
  carouselImage: {
    marginHorizontal: width * 0.025,
    width: width * 0.95,
    height: "100%",
    borderRadius: 10,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 0,
  },
});
