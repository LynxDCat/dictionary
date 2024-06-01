import React, { useState,useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Image} from 'react-native';
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import CustomButton from '../CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';


function CustomMenu({ ModalVisible, setModalVisible }) {
    const closeModal = async () => {
        console.log("pressed");
        setModalVisible(!ModalVisible);
      }
    
    const navigation = useNavigation();

    const dictionaryPressed = async () => {
        console.log("pressed");
        navigation.navigate('Landing Page');
      }

    const LogOutPressed = async () => {
        console.log("pressed");
        navigation.navigate('Sign In');
    }
    return (
        <View>
            
            <Modal
                animationType='none'
                transparent={true}
                visible={ModalVisible}
                onRequestClose={() => {
                    setModalVisible(!ModalVisible);
                }}
            >
                
                <View style={styles.menu}>
                    <View style={styles.modalView}>
                        <Image source={require("@/assets/images/logoWhite.jpg")} style = {styles.logoImage}/>
                        <Image source={require("@/assets/images/talahulugananWhite.jpg")} style = {styles.logoWord}/>
                        <View style = {styles.filler}/>
                        <CustomButton
                            buttonStyle={styles.signInButton}
                            textStyle={styles.signInButtonText}
                            onPress = {dictionaryPressed}
                        >
                            Dictionary
                        </CustomButton>
                        
                        <CustomButton
                            buttonStyle={styles.signInButton}
                            textStyle={styles.signInButtonText}
                            onPress = {LogOutPressed}
                        >
                            Log Out
                        </CustomButton>
                        
                    </View>
                    <Pressable style = {styles.close} onPress={closeModal}/>
                    
                </View>
                
            </Modal>
            
        </View>
    );
}

export default CustomMenu;

const styles = StyleSheet.create({
   
      modal: {
        height: '100%',
        
      },
      menu: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 0,
      },
      modalView: {
        backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        justifyContent: 'flex-end',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '100%',
        width: '50%'
      },
      close: {
        width: '50%',
        height: '100%',
        
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: '#CAA35D',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },

      signInButton: {
        backgroundColor: '#CAA35D',
        width: '100%'
      },
      signInButtonText: {
        color: '#0F1F2F',
      },

      logoImage:{
        width: 100,
        height: 100
       },
       logoWord:{
        width: 150,
        height: 40,
       },
       filler :{
        height: '30%'
       }
      


});

