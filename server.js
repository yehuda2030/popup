const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

// מאגר מחוברים לשידור הודעות לכולם
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

// ניהול בקשת Webhook מ-MAKE
app.post('/webhook', (req, res) => {
  const { userID, customerName, phoneNumber } = req.body;

  // שליחת הודעה לכל מחובר
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ userID, customerName, phoneNumber }));
    }
  });

  res.status(200).send('Notification sent to all clients');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
