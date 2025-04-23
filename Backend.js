
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const messagesFilePath = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());

// GET all messages
app.get('/messages', (req, res) => {
  fs.readFile(messagesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read messages' });
    }
    const messages = JSON.parse(data || '[]');
    res.json(messages);
  });
});

// POST a new message
app.post('/messages', (req, res) => {
  const { username, message, timestamp } = req.body;
  if (!username || !message || !timestamp) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  fs.readFile(messagesFilePath, 'utf8', (err, data) => {
    const messages = err ? [] : JSON.parse(data || '[]');
    const newMessage = { username, message, timestamp };
    messages.push(newMessage);

    fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save message' });
      }
      res.json(newMessage);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
