import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation";
import { UserProvider } from "./src/Context/UserContext";
export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
