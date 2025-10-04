// routes/centers.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/:zip", (req, res) => {
  const zip = req.params.zip;
  try {
    const centers = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/centers.json")));
    const nearby = centers[zip] || [];
    res.json({ zip, centers: nearby });
  } catch (err) {
    console.error("Centers Error:", err.message);
    res.status(500).json({ error: "Failed to load centers" });
  }
});

module.exports = router;
