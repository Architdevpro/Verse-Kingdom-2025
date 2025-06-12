const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful chatbot for QuadCore, a YouTube channel that posts memes, anime edits, football videos, and trending news.",
        },
        { role: "user", content: userMessage },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});