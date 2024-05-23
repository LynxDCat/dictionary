import { useEffect } from "react";
import { Text, View } from "react-native";
import { initializeFirebaseApp, checkDocument } from "./firebase";

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
