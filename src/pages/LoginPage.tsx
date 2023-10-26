import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import { ApiLoginHelper } from "../helpers/ApiHelpers";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const LoginPage = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await ApiLoginHelper(
          JSON.stringify({ email, password })
        );
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <Text>LoginPage</Text>
      <View style={{ marginTop: 15 }}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCorrect={false}
          autoComplete="email"
          keyboardType="email-address"
          style={styles.input}
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCorrect={false}
          autoComplete="password"
          secureTextEntry={true}
          style={styles.input}
        />
      </View>

      <View>
        <Button title="Connecter" onPress={handleSubmit} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 15,
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 25,
  },
  button: {
    padding: 10,
    marginTop: 15,
    flexDirection: "row",
    width: "65%",
    backgroundColor: "white",
    borderColor: "#8D00FB",
    borderWidth: 2,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default LoginPage;
