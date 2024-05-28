import { useEffect } from "react";
import { Text, View } from "react-native";
import { initializeFirebaseApp, checkDocument } from "./firebase";

const { fetchDefinition } = require('./dictionaryAPI');

const word = 'Book'; // Replace this with the word you want to look up

fetchDefinition(word)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error.message);
  });

export default function Index() {
  useEffect(() => {
    initializeFirebaseApp();

    // NOTE: Paki palitan to Gab nung variable mo na email and password
    const email = "jayruizdeocampo103@gmail.com";
    const password = "admin101";
    checkDocument(email, password);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
