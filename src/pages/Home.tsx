import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CarouselHome from "../components/CarouselHome";
import CategorySilder from "../components/CategorySilder";
import VideoSlider from "../components/VideoSlider";

export default function Home({ selectedCategory, setSelectedCategory }) {
  return (
    <ScrollView style={styles.scrollView}>
      <CarouselHome />
      <CategorySilder setSelectedCategory={setSelectedCategory} />
      <VideoSlider title={"Mis en avant"} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    backgroundColor: "#010D18",
  },
});
