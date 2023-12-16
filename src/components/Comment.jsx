import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import ApiHelper from "../helpers/ApiHelpers";

const Comment = ({ videoId }) => {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [videosComments, setVideoComments] = useState([]);

  useEffect(() => {
    if (videoId) {
      ApiHelper(`/api/videos/infos/${videoId}`, "GET")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((comments) => {
          console.log("Comments:", comments);
          setVideoComments(comments);
        })
        .catch((error) => {
          console.error("Error when getting infos", error);
        });
    }
  }, [videoId]);

  const handleSubmit = () => {
    if (!comment.trim()) {
      console.log("Comment is empty");
      return;
    }

    const data = JSON.stringify({
      content: comment,
      User_id: user.sub,
      Videos_id: videoId,
    });

    ApiHelper(`/api/videos/infos/${videoId}/comments/`, "POST", data)
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((comments) => {
        console.log("Comments:", comments);
        setVideoComments(comments);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 15,
          alignItems: "center",
        }}
      >
        {user?.user?.avatar ? (
          <Image
            style={styles.avatar}
            source={{ uri: `${backendUrl}/api/avatars/${user.user.avatar}` }}
          />
        ) : (
          <Image
            style={styles.avatar}
            source={require("../../assets/img/defaultAvatar.jpeg")}
          />
        )}
        <TextInput
          placeholder="Ajouter un commentaire..."
          placeholderTextColor="white"
          style={styles.input}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Image
            style={styles.img}
            source={require("../../assets/img/send.png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "space-around",
          marginTop: 15,
        }}
      >
        {Array.isArray(videosComments.comment) &&
          videosComments.comment.map((com, index) => (
            <View style={{ display: "flex", flexDirection: "row", margin: 10 }}>
              <Image
                key={index}
                style={styles.avatar}
                source={
                  com?.avatar
                    ? { uri: `${backendUrl}/api/avatars/${com?.avatar}` }
                    : require("../../assets/img/defaultAvatar.jpeg")
                }
              />
              <Text style={{ color: "white", margin: 15 }}>{com?.content}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  wrapper: {
    width: "98%",
    alignSelf: "center",
    backgroundColor: "#010D18",
    minHeight: "20%",
    borderWidth: 1,
    borderColor: "#006DCE",
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    width: "65%",
    borderBottomColor: "#006DCE",
    color: "white",
    paddingLeft: 10,
  },
  img: { height: 30, width: 30, alignSelf: "center" },
  avatar: { height: 50, width: 50, backgroundColor: "white", borderRadius: 50 },
});
