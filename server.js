const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI client setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure this is set in Render's Environment variables
});

// Simple route
app.get('/', (req, res) => {
  res.send('MiniChat API is live!');
});

// Chat route
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    });

    // 👉 Add this to log the OpenAI response
    console.log("OpenAI response:", completion);

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});
