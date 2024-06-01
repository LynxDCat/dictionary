import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native';
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import CustomButton from '../CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';


function CustomAlert({ ErrorVisible, setErrorVisible }) {
    const closeModal = async () => {
        console.log("pressed");
        setErrorVisible(!ErrorVisible);
      }
    return (
        <View>

            <Modal
                animationType='none'
                transparent={true}
                visible={ErrorVisible}
                onRequestClose={() => {
                    setErrorVisible(!ErrorVisible);
                }}
            >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Error</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>Close Pop-Up</Text>
                        </Pressable>
                    </View>
                </View>
                

        
                
            </Modal >
            
        </View >
    );
}

export default CustomAlert;

const styles = StyleSheet.create({

    modal: {
        height: '100%',
        backgroundColor: 'blue'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
});

