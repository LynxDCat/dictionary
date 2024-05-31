import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MenuButton from "../../assets/images/menu-button.png";

export default function RecentScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={MenuButton} sytle={styles.imageStyle}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  navbar: {
    backgroundColor: "#CAA35D",
    width: "100%",
    aspectRatio: 430 / 60,
    justifyContent: "center",
  },
  imageStyle: {
    width: 42,
    height: "100%",
    margin: 50, // Add margin around the image
  },
});
