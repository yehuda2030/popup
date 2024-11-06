const express = require('express');
const cors = require('cors'); // ייבוא מודול CORS
const app = express();
const port = process.env.PORT || 3000;

// שימוש ב-CORS כדי לאפשר גישה לכל המקורות
const corsOptions = {
  origin: 'chrome-extension://dpfkmiaklhejajondhjnfcmmdnplodom', // הגדר את המקור של תוסף כרום
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));

// טיפול בבקשות OPTIONS במפורש
app.options('/webhook', cors(corsOptions));

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