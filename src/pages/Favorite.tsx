import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import VideoCard from "../components/VideoCard";
import { View } from "react-native";
import ApiHelper from "../helpers/ApiHelpers";
import { useFocusEffect } from "@react-navigation/native";

const Favorite = () => {
  const { user } = useUser();

  const [favortieVideos, setFavoriteVideos] = useState([]);

  const loadFavoriteVideos = async () => {
    try {
      const response = await ApiHelper(`/api/favoris/${user.sub}`);
      const videos = await response.json();
      setFavoriteVideos(videos);
    } catch (error) {
      console.error("Error loading favorite videos:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavoriteVideos();
    }, [user.sub])
  );

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          {favortieVideos?.map((video) => (
            <View style={styles.videoCardContainer} key={video.id}>
              <VideoCard video={video} />
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Favorite;
const styles = StyleSheet.create({
  videoCardContainer: {
    width: 190,
    aspectRatio: 9 / 9,
    marginRight: 10,
  },
});
