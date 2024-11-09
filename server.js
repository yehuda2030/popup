const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// פונקציה לבדיקת קיום ה-ID
function checkIfIDExists(userID) {
  return userID === "12345"; // ערך לדוגמה, שנה לפי הצורך
}

// נתיב לקבלת Webhook
app.post('/webhook', (req, res) => {
  const { userID } = req.body;
  if (checkIfIDExists(userID)) {
    res.send(`FOUND ID ${userID}`);
  } else {
    res.send(`ID NOT FOUND`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
