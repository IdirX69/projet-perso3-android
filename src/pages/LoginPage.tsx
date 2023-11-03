import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import { ApiLoginHelper } from "../helpers/ApiHelpers";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const { setUser } = useUser();
  const { user } = useUser();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = {
    email,
    password,
  };

  const RegisterButton = ({ onPress, buttonStyle }) => (
    <TouchableOpacity onPress={onPress} style={[styles.text, buttonStyle]}>
      <Text
        style={{
          textAlign: "center",
          color: "white",
          margin: 15,
          textDecorationLine: "underline",
        }}
      >
        S'inscrire
      </Text>
    </TouchableOpacity>
  );

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await ApiLoginHelper(JSON.stringify(postData));
        if (!response.ok) {
          throw new Error("Erreur de connexion");
        } else {
        }
        const result = await response.json();
        if (result && result.token) {
          const decoded = jwtDecode(result.token);
          setUser({ sub: decoded.sub, iat: decoded.iat, token: result.token });

          await SecureStore.setItemAsync(
            "userToken",
            JSON.stringify({ user: decoded.sub, token: result.token })
          );
        }
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={{ backgroundColor: "#010D18", height: "100%" }}>
      <View style={{ marginTop: 15 }}>
        <View style={{ marginBottom: 50 }}>
          <Image
            style={styles.img}
            source={require("../../assets/img/loginImg.jpeg")}
          />
          <Image
            style={styles.logo}
            source={require("../../assets/img/logoOrigins.png")}
          />
        </View>
        <View style={{ marginHorizontal: 65, marginTop: 50 }}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            style={styles.inputText}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            autoComplete="password"
            secureTextEntry={true}
            style={styles.inputText}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            textAlign: "center",
            color: "white",
          }}
        >
          Se connecter
        </Text>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            textAlign: "center",
            color: "white",
          }}
        >
          Vous n'avez pas de compte ?
        </Text>
        <RegisterButton
          style={styles.text}
          onPress={() => navigation.navigate("Register")}
        />

        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "white",
          }}
        >
          Mot de passe oubliée ?
        </Text>
      </View>
    </View>
  );
};
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

export default LoginPage;
