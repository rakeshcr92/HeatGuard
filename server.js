const express = require("express");
const bodyParser = require("body-parser");
const { getSummary } = require("./routes/summary");

// Import routers
const riskRouter = require("./routes/risk");
const centersRouter = require("./routes/centers");
const voiceRouter = require("./routes/voice");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/risk", riskRouter);
app.use("/centers", centersRouter);
app.use("/voice", voiceRouter);

// Summarize Route (Gemini)
app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).send("Missing text");
    const summary = await getSummary(text);
    res.json({ summary });
  } catch (err) {
    console.error("Summarize Error:", err.message);
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
