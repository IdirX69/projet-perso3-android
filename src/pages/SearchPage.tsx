import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ApiHelper from "../helpers/ApiHelpers";
import VideoCard from "../components/VideoCard";
import { useNavigation } from "@react-navigation/native";

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

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
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Player");
  };
  return (
    <View style={{ backgroundColor: "#010D18", height: "100%" }}>
      <TextInput
        placeholder="Recherche"
        style={styles.searchBar}
        onChangeText={(text) => setSearch(text)}
      ></TextInput>
      {videos
        .filter((video) =>
          video.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((video) => (
          <TouchableOpacity key={video.id} onPress={handlePress}>
            <VideoCard video={video} />
          </TouchableOpacity>
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    width: "70%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 10,
    fontSize: 14,
    padding: 2,
    paddingHorizontal: 7,
  },
});
