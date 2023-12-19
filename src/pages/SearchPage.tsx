import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ApiHelper from "../helpers/ApiHelpers";
import VideoCard from "../components/VideoCard";

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "#010D18",
          paddingVertical: 10,
          height: "100%",
        }}
      >
        <TextInput
          placeholder="Recherche"
          style={styles.searchBar}
          onChangeText={(text) => setSearch(text)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          {videos
            .filter((video) =>
              video.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((video) => (
              <View style={styles.videoCardContainer} key={video.id}>
                <VideoCard video={video} />
              </View>
            ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  videoCardContainer: {
    width: 190,
    aspectRatio: 9 / 9,
    marginRight: 10,
  },
});
