import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ApiHelper from "../helpers/ApiHelpers";

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  console.log(videos);

  useEffect(() => {
    ApiHelper(`/api/videos`, "GET")
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.error("Error when getting user", error);
      });
  }, []);
  return (
    <View>
      <Text>SearchPage</Text>
    </View>
  );
}
