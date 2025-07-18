import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  console.log("POST /shorten - Received URL:", url);

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  
  try {
    new URL(url);
  } catch (error) {
    console.log("Invalid URL format:", url);
    return res.status(400).json({ error: "Invalid URL format. Please include http:// or https://" });
  }

  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }) ,
    });

    const data = await response.json();
    console.log("CleanURI API response:", data);

    if (data.error) {
      console.log("CleanURI API error:", data.error);
      return res.status(500).json({ error: data.error });
    }

    return res.json({ result_url: data.result_url });
  } catch (error) {
    console.error("URL Shortening failed:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.get("/shorten", async (req, res) => {
  const { url } = req.query;

  console.log("GET /shorten - Received URL:", url);

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

 
  try {
    new URL(url);
  } catch (error) {
    console.log("Invalid URL format:", url);
    return res.status(400).json({ error: "Invalid URL format. Please include http:// or https://" });
  }

  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    return res.json({ result_url: data.result_url });
  } catch (error) {
    console.error("URL Shortening failed:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
