require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/check", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.post(
      "https://api.checkphish.ai/check/url",
      {
        url: url,
        strictness: "high",
        provider: "google_safe_browsing"
      },
      {
        headers: {
          "x-api-key": process.env.CHECKPHISH_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error checking URL:", error.message);
    res.status(500).json({ error: "Threat check failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
