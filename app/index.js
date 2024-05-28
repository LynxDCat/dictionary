import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { initializeFirebaseApp, checkDocument } from "./firebase";
import { useForm } from 'react-hook-form';
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";
import { fetchDefinition } from './dictionaryAPI'; // Import fetchDefinition directly

export default function Index() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async ({ username, password }) => {
    setIsSigningIn(true);
    try {
      // Initialize Firebase app
      initializeFirebaseApp();

      // Check user document in Firestore
      await checkDocument(username, password);

      // Fetch definition
      const word = 'Book'; // Replace this with the word you want to look up
      const data = await fetchDefinition(word);
      console.log(data);
      
      setIsSigningIn(false);
    } catch (error) {
      console.log(error);
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        control={control}
        name='username'
        rules={{ required: true }}
        placeholder='USERNAME'
      />
      <CustomInput
        control={control}
        name='password'
        rules={{ required: true }}
        placeholder='PASSWORD'
        secureTextEntry={true}
      />
      <View style={styles.signInButtonContainer}>
        <CustomButton
          buttonStyle={styles.signInButton}
          textStyle={styles.signInButtonText}
          onPress={handleSubmit(onSubmit)}
          disabled={isSigningIn}
        >
          {!isSigningIn ? 'Sign in' : 'Signing in...'}
        </CustomButton>
      </View>
      <View style={styles.filler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3754',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signInButtonContainer: {
    marginTop: 18,
    width: "20%",
  },
  signInButton: {
    backgroundColor: '#CAA35D',
  },
  signInButtonText: {
    color: '#0F1F2F',
  },
  filler: {
    height: "15%",
  },
});
