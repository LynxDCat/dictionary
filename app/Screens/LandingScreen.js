import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { fetchDefinition, fetchAudioURL } from "../dictionaryAPI";

export default function LandingScreen() {
  // useState
  const [word, setWord] = useState("");
  const [definition] = useState(null);
  const [audioUrl] = useState(null); // State to hold audio URL

  // To search a word
  const searchWord = async () => {
    try {
      // Fetch definition data
      console.log(word); // Console.log the current value of the word state
      const data = await fetchDefinition(word);

      // Check if the data is an array
      if (Array.isArray(data)) {
        // Iterate over the array elements
        data.forEach((entry) => {
          // Log the definition, name, and examples
          console.log("Definition:", entry.shortdef);
          console.log("Name:", entry.meta.stems);
          console.log("Examples:", entry.fl);
        });

        // Fetch audio URL
        const url = await fetchAudioURL(word);
        console.log("Audio URL:", url); // Log the audio URL to the console
      } else {
        // Console.log a message if no definition is found
        console.log("No definition found.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={setWord}
      />
      <Button title="Search" onPress={searchWord} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  definitionContainer: {
    marginTop: 16,
  },
  audioContainer: {
    marginTop: 16,
  },
});
