import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import VideoCard from "../components/VideoCard";

const Favorite = () => {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  const { user, setUser } = useUser();

  const [favortieVideos, setFavoriteVideos] = useState([]);

  console.log(favortieVideos);

  useEffect(() => {
    fetch(`${backendUrl}/api/favoris/${user.sub}`)
      .then((res) => res.json())
      .then((videos) => {
        setFavoriteVideos(videos);
      });
  }, []);
  return (
    <View style={{ backgroundColor: "#010D18", height: "100%" }}>
      {favortieVideos.map((video) => (
        <TouchableOpacity key={video.id}>
          <VideoCard video={video} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Favorite;