const express = require('express');
const cors = require('cors'); // ייבוא מודול CORS
const app = express();
const port = process.env.PORT || 3000;

// הגדרת אפשרויות CORS
const corsOptions = {
  origin: 'chrome-extension://dpfkmiaklhejajondhjnfcmmdnplodom', // המקור של תוסף כרום
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));

// טיפול בבקשת OPTIONS באופן מפורש לנתיב /webhook
app.options('/webhook', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'chrome-extension://dpfkmiaklhejajondhjnfcmmdnplodom');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // מחזיר תשובה תקינה לבקשת OPTIONS
});

app.use(express.json());

// Endpoint לקבלת וובהוק מ-MAKE
app.post('/webhook', (req, res) => {
  const { userID, customerName, phoneNumber } = req.body;
  console.log(`Received webhook for userID ${userID}: ${customerName}, ${phoneNumber}`);
  res.status(200).send('Webhook received');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});