import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { fetchDefinition, fetchAudioURL } from "../dictionaryAPI";
import CustomButton from "@/components/CustomButton/CustomButton";
import CustomSearch from "@/components/CustomSearch/CustomSearch";
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
  const [word, setWord] = useState("");
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      word: "", 
    },
  });

  const cleanText = (text) => {
    return text.replace(/{[^}]+}/g, '');
  };

  const searchWord = async ({ word }) => {
    try {
      const data = await fetchDefinition(word);

      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        const definition = data[0].shortdef || [];
        const stems = data[0].meta.stems || [];
        const POS = data[0].fl || "";
        const phonetic = data[0].hwi.prs[0].mw || "";
        const firstKnownUse = data[0].date || "";
        const historyAndEtymology = data[0].et[0][1] || "";

        // Extracting examples safely
        let examples = [];
        if (data[0].def && data[0].def[0] && data[0].def[0].sseq) {
          data[0].def[0].sseq.forEach(sseqItem => {
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

        // Extracting synonyms and antonyms safely
        let synonyms = [];
        let antonyms = [];
        if (data[0].meta && data[0].meta.syns && data[0].meta.syns.length > 0) {
          synonyms = data[0].meta.syns.flat().map(cleanText);
        }
        if (data[0].meta && data[0].meta.ants && data[0].meta.ants.length > 0) {
          antonyms = data[0].meta.ants.flat().map(cleanText);
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
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomSearch
        control={control}
        name="word"
        rules={{ required: false }}
        placeholder="Enter a Word"
        onPress={handleSubmit(searchWord)}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D3754",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  SearchButtonContainer: {
    marginTop: 18,
    width: "20%",
    marginBottom: "15%",
  },
  SearchButton: {
    backgroundColor: "#CAA35D",
  },
});
  