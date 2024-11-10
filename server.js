// ייבוא המודולים הדרושים
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// הפעלת CORS ו-parsing ל-JSON בבקשות
app.use(cors());
app.use(express.json());

// יצירת שרת HTTP
const server = http.createServer(app);

// הגדרת WebSocket לשרת
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// נתיב לקבלת Webhook ושליחה לכל חיבורי WebSocket
app.post('/webhook', (req, res) => {
  const { userID, customerName, phoneNumber } = req.body;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ userID, customerName, phoneNumber }));
    }
  });
  res.status(200).send('Notification sent to clients');
});

// הפעלת השרת על הפורט
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
