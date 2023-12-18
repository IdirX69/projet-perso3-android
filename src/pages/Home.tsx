import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CarouselHome from "../components/CarouselHome";
import CategorySilder from "../components/CategorySilder";

export default function Home() {
  return (
    <ScrollView style={styles.scrollView}>
      <CarouselHome />
      <CategorySilder />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    backgroundColor: "#010D18",
  },
});
