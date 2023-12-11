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
      {/* <Image source={require(`${backendUrl}/api/avatars/${user.avatar}`)} /> */}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          margin: 5,
        }}
      >
        <TextInput
          placeholder="Ajouter un commentaire..."
          style={styles.input}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <Image
          style={styles.img}
          source={require("../../assets/img/send.png")}
        />
      </View>
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  wrapper: {
    borderColor: "blue",
    backgroundColor: "white",
    minHeight: "20%",
    borderRadius: 10,
  },
  input: { backgroundColor: "red", width: "85%" },
  img: { backgroundColor: "green", height: 26, width: 20, alignSelf: "center" },
});
