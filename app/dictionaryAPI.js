import axios from 'axios';

// API Keys for Dictionary and Thesaurus
const dictionaryApiKey = '4cfd5be6-57f6-433e-a072-a247d4d256ca';
const thesaurusApiKey = '6ab6cee3-6a8b-484f-af4b-d0a3a93739db';

async function fetchDefinition(word) {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictionaryApiKey}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from the API: ' + error.message);
  }
}

async function fetchThesaurus(word) {
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${thesaurusApiKey}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from the Thesaurus API: ' + error.message);
  }
}

async function fetchAudioURL(word) {
  try {
    const data = await fetchDefinition(word);
    
    if (Array.isArray(data) && data.length > 0 && data[0].hwi && data[0].hwi.prs && data[0].hwi.prs.length > 0) {
      const pronunciation = data[0].hwi.prs[0];
      if (pronunciation.sound && pronunciation.sound.audio) {
        return `https://media.merriam-webster.com/soundc11/${pronunciation.sound.audio[0]}/${pronunciation.sound.audio}.wav`;
      }
    }
    
    return null;
  } catch (error) {
    throw new Error('Error fetching audio URL: ' + error.message);
  }
}

export { fetchDefinition, fetchThesaurus, fetchAudioURL };
