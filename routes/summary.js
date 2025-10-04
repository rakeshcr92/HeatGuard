// routes/summary.js
const axios = require("axios");

// 🔑 Direct inline Gemini API key
const GEMINI_API_KEY = "";

async function getSummary(text) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          { parts: [{ text: `Summarize in 2 sentences: ${text}` }] }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        }
      }
    );

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated"
    );
  } catch (err) {
    console.error("Gemini API call failed:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getSummary };
