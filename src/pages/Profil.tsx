import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import ApiHelper from "../helpers/ApiHelpers";

export default function Profil() {
  const { user } = useUser();

  const [userInfo, setUserInfo] = useState({});

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
    <View style={{ backgroundColor: "#010D18", height: "100%" }}>
      <View style={{ marginBottom: 50 }}>
        <Image
          style={styles.img}
          source={require("../../assets/img/profilback.png")}
        />
        <Image
          style={styles.logo}
          source={require("../../assets/img/logoOrigins.png")}
        />
      </View>
      <Text>{userInfo.firstname}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 5,
    color: "white",
  },
  img: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: 210,
    resizeMode: "cover",
  },
  logo: {
    position: "absolute",
    width: "30%",
    height: 100,
    bottom: -50,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#010D18",
  },
  inputText: {
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: "#012748",
    borderRadius: 10,
    borderWidth: 1,
    color: "white",
    borderColor: "#006DCE",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#006DCE",
    height: 50,
    marginBottom: 15,
    justifyContent: "center",
    marginHorizontal: 100,
    borderRadius: 10,
    marginTop: 15,
  },
});
