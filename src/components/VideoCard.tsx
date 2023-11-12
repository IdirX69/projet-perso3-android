import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment-with-locales-es6";
import React from "react";

export default function VideoCard({ video }) {
  const videoDate = (video) =>
    moment(video.creation_date).locale("fr").fromNow();
  console.log(video);
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  return (
    <View style={styles.imageWrapper} onPress={() => {}}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${backendUrl}/api/videos/${video.img}` }}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <View style={styles.videoInfo}>
            <View style={styles.videoInfoText}>
              <Text style={[styles.videoName, styles.mediumText]}>
                {video.name}
              </Text>
              <Text style={[styles.videoSubtext, styles.mediumText]}>
                {videoDate(video)}
              </Text>
            </View>
            <View style={styles.btnPlay} onPress={() => {}}>
              {/* play button icon */}
              <Image source={require("../../assets/img/playIcon.png")} />
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.videoTime}>{video.category_description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    width: "40%",
    height: "45%",
    position: "relative",
    margin: "5%",
    zIndex: 0,
    // Add other styles based on media queries for larger screens
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    // Add other image styles
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 16, 34, 0.5)",
    padding: 2,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  videoInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
  videoInfoText: {
    width: "calc(100% - 40)",
  },
  videoName: {
    color: "#fff",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    textAlign: "start",
  },
  videoSubtext: {
    color: "#fff",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    textAlign: "start",
    opacity: 0.8,
  },
  mediumText: {
    fontSize: 14,
    lineHeight: 24,
  },
  videoTime: {
    position: "absolute",
    zIndex: 1,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(139, 156, 163, 0.5)",
    fontSize: 10,
    color: "#fff",
    right: 12,
    top: 12,
  },
  btnPlay: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: "#fff",
    top: "40%",
    left: "40%",
    padding: 10,
  },
});
