// src/service/AIModal.js
// To run this code you need to install the following dependencies:
// npm install @google/genai mime

import { STRICT_AI_PROMPT } from '@/constants/options';
import { GoogleGenAI } from '@google/genai';

 // Import the STRICT_AI_PROMPT from options.jsx

// Build the final prompt by interpolating user inputs
export function buildPrompt({ location, totalDays, totalNights, travelerType, budget }) {
  return STRICT_AI_PROMPT
    .replace('{location}', location)
    .replace('{totalDays}', totalDays)
    .replace('{totalNights}', totalNights)
    .replace('{travelerType}', travelerType)
    .replace('{budget}', budget);
}

// /**
//  * Fetches a travel plan JSON from Gemini based on the provided prompt.
//  * @param {string} prompt - The user-constructed travel plan prompt.
//  * @returns {Promise<Object|string>} Parsed JSON object or raw text on parse failure.
//  */
export async function main(prompt) {
  // Initialize the Gemini client
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  // Send only the user prompt to Gemini
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        role: 'user',
        parts: [ { text: prompt } ],
      },
    ],
    config: { responseMimeType: 'application/json' },
  });

  // The raw generated text
  const raw = response.text;

  try {
    // Attempt to parse as JSON
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not parse response as JSON—returning raw text', err);
    return raw;
  }
}
