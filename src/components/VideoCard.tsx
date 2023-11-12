import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function VideoCard({ video }) {
  console.log(video);
  const backendUrl = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  return (
    <TouchableOpacity
      style={{ flex: 1, margin: 10 }} // Adjust styling as per your requirements
      onPress={() => {}}
    >
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: "100%", height: 200 }} // Adjust styling as per your requirements
          source={{ uri: `${backendUrl}/api/videos/${video.img}` }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity and color as per your requirements
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {video.name}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}></Text>
        </View>
      </View>
      <Text style={{ marginTop: 5 }}>{}</Text>
    </TouchableOpacity>
  );
}
