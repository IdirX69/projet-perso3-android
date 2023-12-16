import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import ApiHelper from "../helpers/ApiHelpers";

const Comment = ({ videoId }) => {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [videosComments, setVideoComments] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    ApiHelper(`/api/users/${JSON.stringify(user.sub)}`, "GET")
      .then((response) => response.json())
      .then((user) => {
        setUserInfo(user);
      })
      .catch((error) => {
        console.error("Error when getting user", error);
      });
    ApiHelper(`/api/videos/infos/${JSON.stringify(videoId)}`, "GET")
      .then((response) => response.json())
      .then((comments) => {
        setVideoComments(comments);
      })
      .catch((error) => {
        console.error("Error when getting user", error);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* <Image source={require(`${backendUrl}/api/avatars/${user.avatar}`)} /> */}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 15,
          alignItems: "center",
        }}
      >
        <Image
          style={styles.avatar}
          source={require("../../assets/img/defaultAvatar.jpeg")}
        />
        <TextInput
          placeholder="Ajouter un commentaire..."
          placeholderTextColor="white"
          style={styles.input}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <Image
          style={styles.img}
          source={require("../../assets/img/send.png")}
        />
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
                source={require("../../assets/img/defaultAvatar.jpeg")}
              />
              <Text style={{ color: "white", margin: 15 }}>{com.content}</Text>
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
