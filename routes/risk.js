// routes/risk.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post("/", (req, res) => {
  const { zip } = req.body;
  if (!zip) return res.status(400).json({ error: "Missing zip" });

  try {
    const weather = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/weather.json")));
    const population = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/population.json")));

    const temp = weather[zip] || 100;
    const elderlyPop = population[zip]?.elderly || 0;

    let risk = "low";
    if (temp > 105 || elderlyPop > 500) risk = "medium";
    if (temp > 110 || elderlyPop > 1000) risk = "high";

    res.json({ zip, temp, elderlyPop, risk });
  } catch (err) {
    console.error("Risk Error:", err.message);
    res.status(500).json({ error: "Failed to calculate risk" });
  }
});

module.exports = router;
