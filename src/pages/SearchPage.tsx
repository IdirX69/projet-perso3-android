import { View, Text } from "react-native";
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
    <View>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </View>
  );
}
