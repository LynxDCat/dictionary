import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { fetchDefinition } from "../dictionaryAPI";

export default function LandingScreen() {
  // useStates
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);

  // To search a word
const searchWord = async () => {
  try {
    console.log(word); // Log the current value of the word state
    const data = await fetchDefinition(word);
    console.log(word);

    // Check if the data is an array
    if (Array.isArray(data)) {
      // Iterate over the array elements
      data.forEach(entry => {
        // Log the definition, name, and examples
        console.log("Definition:", entry.shortdef);
        console.log("Name:", entry.meta.stems);
        console.log("Examples:", entry.fl);
      });
    } else {
      // Log a message if no definition is found
      console.log("No definition found.");
    }
  } catch (error) {
    console.error(error.message);
  }
};

  // It's return value
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={setWord}
      />
      <Button title="Search" onPress={searchWord} />
      {definition && (
        <View style={styles.definitionContainer}>
          <Text>{JSON.stringify(definition, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  definitionContainer: {
    marginTop: 16,
  },
});