// LandingScreen.js

import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { fetchDefinition } from "../dictionaryAPI";

export default function LandingScreen() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);

  const searchWord = async () => {
    try {
      const data = await fetchDefinition(word);
      setDefinition(data);
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
      {definition && (
        <View style={styles.definitionContainer}>
          <Text>{JSON.stringify(definition, null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

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