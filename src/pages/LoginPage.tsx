import { View, Text } from "react-native";
import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import { ApiLoginHelper } from "../helpers/ApiHelpers";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const LoginPage = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    </View>
  );
};

export default LoginPage;
