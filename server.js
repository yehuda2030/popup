const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware לקריאת JSON מהבקשות הנכנסות
app.use(express.json());

// Endpoint לקבלת וובהוק מ-MAKE
app.post('/webhook', (req, res) => {
  const { userID, customerName, phoneNumber } = req.body;

  console.log(`Received webhook for userID ${userID}: ${customerName}, ${phoneNumber}`);

  // כאן תוכל לבצע פעולות נוספות עם המידע במידת הצורך
  res.status(200).send('Webhook received');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});