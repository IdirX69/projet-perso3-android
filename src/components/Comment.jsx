import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import ApiHelper from "../helpers/ApiHelpers";

const Comment = () => {
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useState("");
  console.log(user);
  useEffect(() => {
    ApiHelper(`/api/users/${JSON.stringify(user.sub)}`, "GET")
      .then((response) => response.json())
      .then((user) => {
        setUserInfo(user);
      })
      .catch((error) => {
        console.error("Error when getting user", error);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Utilisez require pour charger l'image localement */}
      {/* <Image source={require(`${backendUrl}/api/avatars/${user.avatar}`)} /> */}

      {/* Utilisez value et onChangeText pour gérer le texte de l'entrée */}
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <Image style={styles.img} source={require("../../assets/img/send.png")} />
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  wrapper: { backgroundColor: "white", minHeight: "20%", borderRadius: 10 },
  input: { backgroundColor: "red" },
  img: { backgroundColor: "green", height: 20, width: 20 },
});
