const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// הגדרת אפשרויות CORS
const corsOptions = {
  origin: '*', // תוכל לצמצם לדומיין הספציפי של תוסף הכרום אם נדרש
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// טיפול בבקשת OPTIONS לנתיב /webhook
app.options('/webhook', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

// Endpoint לקבלת ה-Webhook
app.post('/webhook', (req, res) => {
  const { userID, customerName, phoneNumber } = req.body;
  console.log(`Received webhook for userID ${userID}: ${customerName}, ${phoneNumber}`);
  res.status(200).send('Webhook received');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
