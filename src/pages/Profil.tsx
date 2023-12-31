import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import ApiHelper from "../helpers/ApiHelpers";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

export default function Profil() {
  const { user, setUser } = useUser();
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({});
  const [editInfo, setEditInfo] = useState(false);

  const handleLogout = () => {
    SecureStore.deleteItemAsync("userToken");
    setUser({});
    navigation.navigate("Home");
  };
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
  const handlePress = () => {
    setEditInfo(false);
    console.log(userInfo);

    const updatedInfo = JSON.stringify({
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
    });

    ApiHelper(`/api/users/${user.sub}`, "PUT", updatedInfo)
      .then((response) => {
        console.log("Mise à jour réussie :", response);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour :", error);
      });
  };
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
      <Text style={styles.text}>
        {userInfo.firstname + " " + userInfo.lastname}
      </Text>
      {!editInfo ? (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditInfo(true)}
          >
            <Text style={styles.textButton}>Modifier mes information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.textButton}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ display: "flex", alignItems: "center" }}>
          <TextInput
            value={userInfo.firstname}
            autoCorrect={false}
            style={styles.inputText}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, firstname: text })
            }
          />
          <TextInput
            value={userInfo.lastname}
            autoCorrect={false}
            style={styles.inputText}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, lastname: text })
            }
          />
          <TextInput
            value={userInfo.email}
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            style={styles.inputText}
            onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 5,
    color: "white",
    textAlign: "center",
    marginTop: 15,
  },
  textButton: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
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
    width: "50%",
    paddingHorizontal: 10,
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
