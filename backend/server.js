// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/check-url", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch("https://api.checkphish.ai/check/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CHECKPHISH_API_KEY
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error checking URL:", err);
    res.status(500).json({ error: "Threat check failed." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
