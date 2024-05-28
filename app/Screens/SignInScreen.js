import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { initializeFirebaseApp, checkDocument } from "../firebase";
import { useForm } from 'react-hook-form';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  // useStates
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigation = useNavigation();

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

  // When the button was clicked
  const onSubmit = async ({ username, password }) => {
    setIsSigningIn(true);
    try {
      // Initialize Firebase app
      initializeFirebaseApp();
      const isTrue = await checkDocument(username, password);

      // Cheking user's credential to firebase
      if(isTrue){
        // Navigate to Landing Screen
        navigation.navigate('Landing Page');
        
      } else {
        console.log("Wrong email or password");
      }
      
      setIsSigningIn(false);
    } catch (error) {
      console.log(error);
      setIsSigningIn(false);
    }
  };
  

  // Return value
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


// CSS
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
