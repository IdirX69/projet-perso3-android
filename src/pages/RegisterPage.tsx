import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ApiRegisterHelper } from "../helpers/ApiHelpers";

const RegisterPage = () => {
  const [firstname, setFirstname] = useState("John");
  const [lastname, setLastname] = useState("Doe");
  const [email, setEmail] = useState("johndoe@mail.com");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const postData = {
    firstname,
    lastname,
    email,
    password,
  };
  const handleSubmit = async () => {
    if (!firstname || !lastname || !email || !password) {
      console.log("erreur 1");

      return;
    }
    try {
      const response = await ApiRegisterHelper(JSON.stringify(postData));

      if (!response.ok) {
        console.log("erreur 2 !ok");
      } else {
        console.log("enregistrement");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#010D18",
        height: "100%",
        overflow: "visible",
      }}
    >
      <View>
        <Image
          style={styles.img}
          source={require("../../assets/img/loginImg.jpeg")}
        />
        <Image
          style={styles.logo}
          source={require("../../assets/img/logoOrigins.png")}
        />
      </View>
      <View style={{ marginHorizontal: 65, marginTop: 70 }}>
        <Text style={styles.text}>Prenom</Text>
        <TextInput
          autoCorrect={false}
          value={firstname}
          onChangeText={(text) => setFirstname(text)}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 65, marginTop: 10 }}>
        <Text style={styles.text}>Nom</Text>
        <TextInput
          autoCorrect={false}
          value={lastname}
          onChangeText={(text) => setLastname(text)}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 65, marginTop: 10 }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          autoCorrect={false}
          autoComplete="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 65, marginTop: 10 }}>
        <Text style={styles.text}>Mot de passe</Text>
        <TextInput
          autoCorrect={false}
          autoComplete="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 65, marginTop: 10 }}>
        <Text style={styles.text}>Confirmer mot de passe</Text>
        <TextInput
          autoCorrect={false}
          autoComplete="password"
          secureTextEntry={true}
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
          style={styles.inputText}
        />
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
          Inscription
        </Text>
      </TouchableOpacity>
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

export default RegisterPage;
