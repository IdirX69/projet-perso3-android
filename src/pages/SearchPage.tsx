import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ApiHelper from "../helpers/ApiHelpers";
import VideoCard from "../components/VideoCard";

export default function SearchPage() {
  const [videos, setVideos] = useState([]);

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
  return (
    <View style={{ backgroundColor: "#010D18", height: "100%" }}>
      <TextInput placeholder="Recherche" style={styles.searchBar}></TextInput>
      {videos.map((video) => (
        <View>
          <VideoCard key={video.id} video={video} />
        </View>
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
