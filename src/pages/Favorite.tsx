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

const Favorite = () => {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  const { user } = useUser();

  const [favortieVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/api/favoris/${user.sub}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
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
