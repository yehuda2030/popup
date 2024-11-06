const express = require('express');
const cors = require('cors'); // הוספת מודול ה-CORS
const app = express();
const port = process.env.PORT || 3000;

// שימוש ב-CORS כדי לאפשר גישה ממקורות חיצוניים
app.use(cors());

// Middleware לקריאת JSON מהבקשות הנכנסות
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