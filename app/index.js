import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useForm } from 'react-hook-form';
import { initializeFirebaseApp, checkDocument } from "./firebase";
import CustomInput from "../components/CustomInput/CustomInput";
import CustomButton from "../components/CustomButton/CustomButton";



export default function Index() {


  const [isSigningIn, setIsSigningIn] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }, l
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (username, passwork) => {

    setIsSigningIn(true);
    try {
      //call login api with your credentials
      Index(username, passwork);
      setIsSigningIn(false);
    } catch (error) {
      setIsSigningIn(false);
    }

    initializeFirebaseApp();

    // NOTE: Paki palitan to Gab nung variable mo na email and password
    const email = username;
    const password = passwork;
    checkDocument(email, password);

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
        name='passwork'
        rules={{ required: true }}
        placeholder='PASSWORD'
        secureTextEntry={true}
      />

      <View style={[styles.signInButtonContainer]}>
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
    flex: 3,
    backgroundColor: '#1D3754',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  logInContainer: {
    width: '80%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    padding: 8,
    backgroundColor: '#CDCDC3',
    marginVertical: 8,
    backgroundColor: '#d3d3d3',
  },
  signInButtonContainer: {
    marginTop: 18,
    width: "20%",
  },
  logoContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    marginBottom: 25,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  logoName: {
    fontSize: 36,
    fontWeight: 'bold',
    height: '100%',
    color: 'dodgerblue',
  },
  logInCard: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
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