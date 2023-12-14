import { TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import VideoCard from "../components/VideoCard";

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
    <TouchableOpacity style={{ backgroundColor: "#010D18", height: "100%" }}>
      {favortieVideos?.map((video) => (
        <VideoCard video={video} key={video.id} />
      ))}
    </TouchableOpacity>
  );
};

export default Favorite;
