const axios = require('axios');

const apiKey = '4cfd5be6-57f6-433e-a072-a247d4d256ca';

/**
 * Fetches the definition of a word from the Merriam-Webster Dictionary API.
 * @param {string} word - The word to look up.
 * @returns {Promise<Object>} - A promise that resolves to the API response.
 */
async function fetchDefinition(word) {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from the API: ' + error.message);
  }
}

module.exports = { fetchDefinition };
