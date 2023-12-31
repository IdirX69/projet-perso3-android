import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ApiHelper from "../helpers/ApiHelpers";
import { useNavigation } from "@react-navigation/native";

const CategorySlider = ({ setSelectedCategory }) => {
  const [category, setCategory] = useState([]);

  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;
  const navigation = useNavigation();
  useEffect(() => {
    ApiHelper(`/api/category`, "GET")
      .then((response) => response.json())
      .then((category) => {
        setCategory(category);
      })
      .catch((error) => {
        console.error("Error when getting category", error);
      });
  }, []);
  const handlePress = (categoryId) => {
    navigation.navigate("Search");
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <Text style={styles.text}>Catégorie</Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {category.map((cat) => (
          <View key={cat.id} style={styles.imgWrapper}>
            <TouchableOpacity onPress={() => handlePress(cat.id)}>
              <Image
                style={styles.image}
                source={{ uri: `${backendUrl}/api/videos/${cat.img}` }}
              />
            </TouchableOpacity>

            <Text style={styles.name}>{cat.name}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default CategorySlider;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  imgWrapper: {
    height: 110,
    width: 190,
    marginHorizontal: 10,
  },
  scrollView: {
    marginTop: 10,
  },
  text: { color: "white", fontSize: 25, margin: 10 },
  name: {
    color: "white",
    fontSize: 18,
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 3,
  },
});
