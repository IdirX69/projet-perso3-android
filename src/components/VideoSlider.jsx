import { Text, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ApiHelper from "../helpers/ApiHelpers";
import VideoCard from "./VideoCard";

const VideoSlider = ({ title }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    ApiHelper(`/api/videos/promote`, "GET")
      .then((response) => response.json())
      .then((videos) => {
        setVideos(videos);
      })
      .catch((error) => {
        console.error("Error when getting videos", error);
      });
  }, []);

  return (
    <>
      <Text style={styles.text}>{title}</Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {videos.map((video) => (
          <View key={video.id} style={styles.videoCardContainer}>
            <VideoCard video={video} />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default VideoSlider;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  videoCardContainer: {
    width: 200,
    justifyContent: "space-around",
    aspectRatio: 9 / 9,
    marginRight: 10,
  },

  scrollView: {
    marginTop: 10,
  },
  text: { fontSize: 25, margin: 10 },
});
