import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigation";
import { UserProvider } from "./src/Context/UserContext";
import { CurrentVideosContextProvider } from "./src/Context/VideoContext";
export default function App() {
  return (
    <UserProvider>
      <CurrentVideosContextProvider>
        <Navigation />
      </CurrentVideosContextProvider>
    </UserProvider>
  );
}
