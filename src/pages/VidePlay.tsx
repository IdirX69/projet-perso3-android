import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useCurrentVideosContext } from "../Context/VideoContext";
import ApiHelper from "../helpers/ApiHelpers";

export default function App() {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  const { selectedId } = useCurrentVideosContext();
  console.log(selectedId);

  const [video, setVideo] = React.useState([]);

  React.useEffect(() => {
    ApiHelper(`/api/videos/infos/${selectedId}`, "GET")
      .then((response) => response.json())
      .then((videos) => {
        setVideo(videos);
      })
      .catch((error) => {
        console.error("Error when getting videos", error);
      });
  }, []);
  console.log(video);

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={{
          uri: `${backendUrl}/api/videos/${video.url}`,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
  },
  video: {
    width: "100%",
    height: 221,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
