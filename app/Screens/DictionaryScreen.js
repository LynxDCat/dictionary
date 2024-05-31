import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function DictionaryScreen({ route }) {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DICTIONARY</Text>
      </View>
      <View style={styles.content}>
        {/* Word */}
        <Text style={styles.word}>{word}</Text>
        {/* Part of Speech & Pronunciation */}
        <Text style={styles.phonetic}>
          {POS} | {phonetic}
        </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1D3754",
    padding: 16,
  },
  header: {
    backgroundColor: "#CAA35D",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  phonetic: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  definitionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 16,
  },
  synAntTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  synAntText: {
    fontSize: 16,
  },
});
