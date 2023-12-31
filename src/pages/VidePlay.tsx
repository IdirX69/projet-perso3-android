import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useCurrentVideosContext } from "../Context/VideoContext";
import ApiHelper from "../helpers/ApiHelpers";
import moment from "moment";
import { useUser } from "../Context/UserContext";

import Comment from "../components/Comment";

export default function App() {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;
  const { user } = useUser();

  const { selectedId } = useCurrentVideosContext();

  const [video, setVideo] = React.useState([]);
  const [favorite, setFavorite] = React.useState([]);

  React.useEffect(() => {
    ApiHelper(`/api/videos/infos/${selectedId}`, "GET")
      .then((response) => response.json())
      .then((videos) => {
        setVideo(videos);
      })
      .catch((error) => {
        console.error("Error when getting videos", error);
      });
    ApiHelper(`/api/favoris/${user.sub}`, "GET")
      .then((response) => response.json())
      .then((videos) => {
        setFavorite(videos);
      })
      .catch((error) => {
        console.error("Error when getting favorite videos", error);
      });
  }, [selectedId]);
  const handleFavorite = async (userId, videoId) => {
    const registerBody = JSON.stringify({
      user_id: userId,
      videos_id: videoId,
    });

    const endpoint = `/api/favoris/${userId}/${videoId}`;

    try {
      // Vérifier si l'élément est déjà un favori
      const isFavorite = (favorite || []).some(
        (videos) => videos.id === videoId
      );

      if (isFavorite) {
        // Si l'élément est un favori, le supprimer
        try {
          await ApiHelper(endpoint, "DELETE");

          // Mettre à jour les favoris après la suppression
          const response = await ApiHelper(`/api/favoris/${userId}`, "GET");
          if (response.ok) {
            const videos = await response.json();
            setFavorite(videos);
          } else {
            console.error(`Error retrieving videos: ${response.status}`);
          }
        } catch (err) {
          console.error(
            `Erreur lors de la suppression du favori: ${err.message}`
          );
        }
      } else {
        // Si l'élément n'est pas un favori, l'ajouter
        try {
          await ApiHelper(`/api/favoris/`, "POST", registerBody);

          // Mettre à jour les favoris après l'ajout
          const response = await ApiHelper(`/api/favoris/${userId}`, "GET");
          if (response.ok) {
            const videos = await response.json();
            setFavorite(videos);
          } else {
            console.error(`Error retrieving videos: ${response.status}`);
          }
        } catch (err) {
          console.error(`Erreur lors de l'ajout du favori: ${err.message}`);
        }
      }
    } catch (error) {
      console.error(`Error handling favorite: ${error.message}`);
    }
  };

  const videoDate = (video) =>
    moment(video.creation_date).locale("fr").fromNow();

  return (
    <ScrollView style={styles.container}>
      <View>
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
      <View>
        <Text style={styles.name}>{video.name}</Text>
        {/* <Text style={styles.date}>{videoDate(video.creation_date)}</Text> */}
        <Text style={styles.description}>{video.description}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.category}>{video.category_description}</Text>
          <TouchableOpacity onPress={() => handleFavorite(user.sub, video.id)}>
            {favorite.find((videos) => videos.id === video.id) ? (
              <Image
                style={styles.img}
                source={require("../../assets/img/fav.png")}
              />
            ) : (
              <Image
                style={styles.img}
                source={require("../../assets/img/unfav.png")}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Comment videoId={video.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010D18",
    height: "100%",
  },
  img: {
    margin: 10,
    marginTop: 50,
    height: 25,
    width: 25,
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
  category: {
    margin: 10,
    backgroundColor: "#006DCE",
    padding: 3,
    maxWidth: "30%",
    textAlign: "center",
    borderRadius: 6,
    color: "white",
    marginTop: 50,
  },
  description: {
    margin: 10,
    color: "white",
  },
  date: {
    margin: 10,
    color: "#006DCE",
  },
  name: {
    margin: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
