import { useState,useRef } from "react"
import { Text, View, StyleSheet, Pressable, Image, Animated } from "react-native";
import { initializeFirebaseApp, checkDocument } from "../firebase";
import { useForm } from 'react-hook-form';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar";
import CustomMenu from "@/components/CustomMenu/CustomMenu";
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_900Black, } from "@expo-google-fonts/inter";


export default function SignInScreen() {
  // useStates
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [ModalVisible, setModalVisible] = useState(false);
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

  
  const NavBarSide = async () => {
    console.log("pressed");
    setModalVisible(true);
  }

  // When the button was clicked
  const onSubmit = async ({ username, password }) => {
    setIsSigningIn(true);
    try {
      // Initialize Firebase app
      initializeFirebaseApp();
      const isTrue = await checkDocument(username, password);

      // Cheking user's credential to firebase
      if (isTrue) {
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

  if (!fontsLoaded) {
    return null;
  }
  // Return value
  return (
    <View style={styles.page}>

      <CustomMenu ModalVisible={ModalVisible} setModalVisible={setModalVisible} />
      <CustomNavBar>
        <Pressable onPress={NavBarSide}>
          <Image source={require('@/assets/images/menuButton.png')} />
        </Pressable>
      </CustomNavBar>
      <View style={styles.logoContainer}>

      </View>
      <View style={styles.container}>
        <Text style={styles.signintext}>Sign In</Text>
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
            {!isSigningIn ? 'Sign In' : 'Signing In...'}
          </CustomButton>
        </View>
        <View style={styles.filler} />
      </View>
      
    </View>
  );
}


// CSS
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: '#1D3754',
    height: "100%",
    width: "100%"
  },
  logoContainer: {
    backgroundColor: "blue",
    alignItems: "flex-start",
    height: '50%',
  },
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
  signintext: {
    fontFamily: 'Inter_900Black',
    fontSize: 15,
    fontWeight: 'bold',
    height: '5%',
    color: '#CAA35D',
    marginBottom: 10,
  },





  
});