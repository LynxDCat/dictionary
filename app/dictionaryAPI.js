import axios from 'axios';

// API Key for Dictionary
const apiKey = '4cfd5be6-57f6-433e-a072-a247d4d256ca';

async function fetchDefinition(word) {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from the API: ' + error.message);
  }
}

async function fetchAudioURL(word) {
  try {
    const data = await fetchDefinition(word);
    
    // Check if data is an array and contains audio information
    if (Array.isArray(data) && data.length > 0 && data[0].hwi && data[0].hwi.prs && data[0].hwi.prs.length > 0) {
      const pronunciation = data[0].hwi.prs[0];
      if (pronunciation.sound && pronunciation.sound.audio) {
        return `https://media.merriam-webster.com/soundc11/${pronunciation.sound.audio[0]}/${pronunciation.sound.audio}.wav`;
      }
    }
    
    // Return null if no audio URL is found
    return null;
  } catch (error) {
    throw new Error('Error fetching audio URL: ' + error.message);
  }
}

export { fetchDefinition, fetchAudioURL };
