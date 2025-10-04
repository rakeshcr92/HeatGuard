// routes/voice.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// 🔑 Direct inline ElevenLabs API key
const ELEVEN_API_KEY = "";

// Example voice ID (change if you want a different one)
const VOICE_ID = "";

router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing text" });

  try {
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", // <-- Rachel's voice ID
      {
        text,
        model_id: "eleven_multilingual_v2"
      },
      {
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        responseType: "arraybuffer"
      }
    );


    res.set("Content-Type", "audio/mpeg");
    res.send(response.data);
  } catch (err) {
    console.error("ElevenLabs Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate voice" });
  }
});

module.exports = router;
