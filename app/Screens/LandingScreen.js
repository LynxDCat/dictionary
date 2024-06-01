import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { fetchDefinition, fetchThesaurus, fetchAudioURL } from "../dictionaryAPI";
import CustomInput from "@/components/CustomInput/CustomInput";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomNavBar from "@/components/CustomNavBar/CustomNavBar";
import CustomMenu from "@/components/CustomMenu/CustomMenu";
import CustomLogo from "@/components/CustomLogo/CustomLogo";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
  // useState
  const [word, setWord] = useState("");
  const navigation = useNavigation();

  const [definition] = useState(null);
  const [audioUrl] = useState(null);

  const [ModalVisible, setModalVisible] = useState(false);
  const [ErrorVisible, setErrorVisible] = useState(false);


  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      word: '',
    },
  });

  const NavBarSide = async () => {
    console.log("pressed");
    setModalVisible(true);
  }
  // To search a word

  const cleanText = (text) => {
    return text.replace(/{[^}]+}/g, '');
  };

  const searchWord = async ({ word }) => {
    try {
      const definitionData = await fetchDefinition(word);
      const thesaurusData = await fetchThesaurus(word); // Assuming you have a function to fetch thesaurus data
  
      if (Array.isArray(definitionData) && definitionData.length > 0 && typeof definitionData[0] === 'object') {
        const definition = definitionData[0].shortdef || [];
        const stems = definitionData[0].meta.stems || [];
        const POS = definitionData[0].fl || "";
        const phonetic = definitionData[0].hwi.prs[0].mw || "";
        const firstKnownUse = definitionData[0].date || "";
        const historyAndEtymology = definitionData[0].et[0][1] || "";
  
        // Extracting examples safely
        let examples = [];
        if (definitionData[0].def && definitionData[0].def[0] && definitionData[0].def[0].sseq) {
          definitionData[0].def[0].sseq.forEach(sseqItem => {
            if (sseqItem[0] && sseqItem[0][1] && sseqItem[0][1].dt) {
              sseqItem[0][1].dt.forEach(dtItem => {
                if (dtItem[0] === 'vis' && Array.isArray(dtItem[1])) {
                  dtItem[1].forEach(visItem => {
                    if (visItem.t) {
                      examples.push(cleanText(visItem.t));
                    }
                  });
                }
              });
            }
          });
        }
  
        // Extracting synonyms and antonyms from thesaurus data
        let synonyms = [];
        let antonyms = [];
        if (Array.isArray(thesaurusData) && thesaurusData.length > 0 && typeof thesaurusData[0] === 'object') {
          thesaurusData.forEach(entry => {
            if (entry.meta && entry.meta.syns && entry.meta.syns.length > 0) {
              synonyms = [...synonyms, ...entry.meta.syns.flat().map(cleanText)];
            }
            if (entry.meta && entry.meta.ants && entry.meta.ants.length > 0) {
              antonyms = [...antonyms, ...entry.meta.ants.flat().map(cleanText)];
            }
          });
        }
  
        const audioUrl = await fetchAudioURL(word);
  
        navigation.navigate('Dictionary Page', {
          word,
          definition,
          synonyms,
          antonyms,
          stems,
          examples,
          POS,
          phonetic,
          firstKnownUse,
          historyAndEtymology,
          audioUrl,
        });
      } else {
        console.log("No definition found.");
        setErrorVisible(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  


  return (
    <View style={styles.page}>
      <CustomMenu ModalVisible={ModalVisible} setModalVisible={setModalVisible} />
      <CustomAlert ErrorVisible={ErrorVisible} setErrorVisible={setErrorVisible} error="No definition found."/>

      <CustomNavBar>
        <Pressable onPress={NavBarSide}>
          <Image source={require('@/assets/images/menuButton.png')} />
        </Pressable>
      </CustomNavBar>
      <CustomLogo style={styles.logoContainer}/>

      <View style={styles.container}>

        <CustomInput
          control={control}
          name='word'
          rules={{ required: false }}
          placeholder='Enter a Word'

        />
        <View style={styles.SearchButtonContainer}>
          <CustomButton
            style={styles.SearchButton}
            onPress={handleSubmit(searchWord)}
          >
            Search
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: '#1D3754',
    height: "100%",
    width: "100%"
  },
  logoContainer: {
    height: '50%',
    width: '100%',
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#CAA35D",
    alignItems: "flex-start",
    height: '10%',
  },
  container: {
    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  SearchButtonContainer: {
    marginTop: 18,
    width: "20%",
    marginBottom: 50,
  },
  SearchButton: {
    backgroundColor: '#CAA35D',
  },
  definitionContainer: {
    marginTop: 16,
  },
  audioContainer: {
    marginTop: 16,
  },
});