import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ApiRegisterHelper } from "../helpers/ApiHelpers";

const RegisterPage = () => {
  // ApiRegisterHelper()
  return (
    <View style={{ marginTop: 50, margin: 20 }}>
      <Text>RegisterPage</Text>
      <View style={{ marginHorizontal: 24 }}>
        <Text style={styles.text}>Prenom</Text>
        <TextInput
          autoCorrect={false}
          secureTextEntry={true}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <Text style={styles.text}>Nom</Text>
        <TextInput
          autoCorrect={false}
          secureTextEntry={true}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          autoCorrect={false}
          autoComplete="email"
          secureTextEntry={true}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <Text style={styles.text}>Mot de passe</Text>
        <TextInput
          autoCorrect={false}
          autoComplete="password"
          secureTextEntry={true}
          style={styles.inputText}
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <Text style={styles.text}>Confirmer mot de passe</Text>
        <TextInput
          autoCorrect={false}
          autoComplete="password"
          secureTextEntry={true}
          style={styles.inputText}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            textAlign: "center",
            color: "#8D00FB",
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
    fontSize: 16,
    marginBottom: 10,
  },
  inputText: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 50,
    borderRadius: 24,
    borderColor: "#8D00FB",
    borderWidth: 1,
  },
});

export default RegisterPage;
