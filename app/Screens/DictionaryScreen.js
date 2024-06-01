import React, { useState, } from "react";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import CustomNavBarDictionary from "@/components/CustomNavBar/CustomNavBarDictionary";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import { Audio } from 'expo-av';
import { useFonts, Inter_900Black, Inter_300Light, Inter_700Bold } from "@expo-google-fonts/inter";
import { useNavigation } from '@react-navigation/native';
import { fetchDefinition, fetchThesaurus, fetchAudioURL } from "../dictionaryAPI";

export default function DictionaryScreen({ route }) {

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_300Light,
    Inter_700Bold,
  });

  const [ErrorVisible, setErrorVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newWord: '',
    },
  });

  const {
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
  } = route.params;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl }
    );
    await sound.playAsync();
  };

  

  const navigation = useNavigation();
  const dictionaryPressed = async () => {
    console.log("pressed");
    navigation.navigate('Landing Page');
  }

  const cleanText = (text) => {
    return text.replace(/{[^}]+}/g, '');
  };
  
  const searchWord = async ({ word }) => {
    try {
      const dictionaryData = await fetchDefinition(word);
      const thesaurusData = await fetchThesaurus(word);
  
      if (Array.isArray(dictionaryData) && dictionaryData.length > 0 && typeof dictionaryData[0] === 'object') {
        const definition = dictionaryData[0].shortdef || [];
        const stems = dictionaryData[0].meta.stems || [];
        const POS = dictionaryData[0].fl || "";
        const phonetic = dictionaryData[0].hwi.prs[0].mw || "";
        const firstKnownUse = dictionaryData[0].date || "";
        const historyAndEtymology = dictionaryData[0].et[0][1] || "";
  
        // Extracting examples safely
        let examples = [];
        if (dictionaryData[0].def && dictionaryData[0].def[0] && dictionaryData[0].def[0].sseq) {
          dictionaryData[0].def[0].sseq.forEach(sseqItem => {
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


  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      
      <CustomAlert ErrorVisible={ErrorVisible} setErrorVisible={setErrorVisible} error="No definition found."/>
      <CustomNavBarDictionary
        onPressBack={dictionaryPressed}
        onPressSearch={searchWord}
      />
      {/*para naiiwan ung word and pronounciation*/}
      <View style={styles.container}>
        <View>
          {/* Word */}
          <Text style={[styles.phonetic, { fontStyle: "normal" }]}>Dictionary</Text>
          <View style={{ width: 300, height: 2, backgroundColor: "white", alignSelf: 'center', }} />
          <Text style={styles.word}>{word}</Text>
          {/* Part of Speech & Pronunciation */}
          <Text style={styles.phonetic}>
            {POS} | {phonetic}
          </Text>
          {/* Pronounce Icon */}
          {audioUrl && (
            <View style={styles.pronounceIconContainer}>
              <Pressable onPress={playSound}>
                <Image source={require('@/assets/images/pronounceIcon.png')} style={styles.pronounceIcon} />
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <ScrollView
        style={styles.containerScroll}
        showsVerticalScrollIndicator={false}>

        <View style={styles.contentScroll}>

          {/* Definition */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Definition</Text>
            {definition.map((def, index) => (
              <Text key={index} style={styles.definitionText}>
                - {def}
              </Text>
            ))}
          </View>
          {/* Synonyms & Antonyms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synonyms & Antonyms</Text>
            <Text style={styles.synAntTitle}>Synonyms</Text>
            {synonyms.length > 0 ? (
              synonyms.map((syn, index) => (
                <Text key={index} style={styles.synAntText}>
                  - {syn}
                </Text>
              ))
            ) : (
              <Text style={styles.synAntText}>No synonyms found.</Text>
            )}
            <Text style={styles.synAntTitle}>Antonyms</Text>
            {antonyms.length > 0 ? (
              antonyms.map((ant, index) => (
                <Text key={index} style={styles.synAntText}>
                  - {ant}
                </Text>
              ))
            ) : (
              <Text style={styles.synAntText}>No antonyms found.</Text>
            )}
          </View>
          {/* Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Examples</Text>
            {examples.length > 0 ? (
              examples.map((example, index) => (
                <Text key={index} style={styles.exampleText}>
                  - {example}
                </Text>
              ))
            ) : (
              <Text style={styles.exampleText}>No examples found.</Text>

            )}
          </View>
          {/* First Known Use */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>First Known Use</Text>
            <Text style={styles.source}>{firstKnownUse}</Text>
          </View>
          {/* History and Etymology */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History and Etymology</Text>
            <Text style={styles.source}>{historyAndEtymology}</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  

  outerContainer: {
    flex: 1,
  },
  container: { 
    backgroundColor: "#1D3754",
    paddingTop: 16,
  },
  containerScroll: {
    flex: 1,
    backgroundColor: "#1D3754",
    padding: 16,
    paddingTop: 0,
    marginTop: 0,
  },
  contentScroll: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    
    
  },
  word: {
    fontFamily: "Inter_900Black",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  phonetic: {
    fontFamily: "Inter_300Light",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 16,
    color: "white",
  },
  pronounceIconContainer: {
    alignItems: "center",
    marginBottom: 16,
    color: "white",
  },
  pronounceIcon: {
    width: 30,
    height: 30,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  definitionText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Inter_300Light",
  },
  exampleText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 4,
    fontFamily: "Inter_300Light",
  },
  source: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 16,
    fontFamily: "Inter_300Light",
  },
  synAntTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  synAntText: {
    fontSize: 16,
    fontFamily: "Inter_300Light",
  },
});