import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import ApiHelper from "../helpers/ApiHelpers";
import { useCurrentVideosContext } from "../Context/VideoContext";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const CarouselHome = () => {
  const [videos, setVideos] = useState([]);
  const { setSelectedId } = useCurrentVideosContext();

  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;
  const navigation = useNavigation();

  useEffect(() => {
    ApiHelper(`/api/videos`, "GET")
      .then((response) => response.json())
      .then((videos) => {
        setVideos(videos);
      })
      .catch((error) => {
        console.error("Error when getting videos", error);
      });
  }, []);

  const handlePress = (videoId) => {
    setSelectedId(videoId);
    navigation.navigate("Player");
  };
  const carouselData = videos.map((video) => ({
    id: video.id.toString(),
    title: video.name,
    image: { uri: `${backendUrl}/api/videos/${video.img}` },
  }));

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem} onTouchEnd={() => handlePress(item.id)}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </View>
  );
  return (
    <Carousel
      layout="stack"
      data={carouselData}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
      loop
      autoplay
    />
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    backgroundColor: "#010D18",
    width: screenWidth,
  },
  carouselImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  carouselTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default CarouselHome;
