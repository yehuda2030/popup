const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'chrome-extension://dpfkmiaklhejajondhjnfcmmdnplodom', // הגדר את המקור של תוסף הכרום
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // לטיפול בכל בקשות ה-OPTIONS

app.use(express.json());

// Route to handle incoming webhooks
app.post('/webhook', (req, res) => {
  const { userID } = req.body;
  // בדוק אם ה-ID קיים במערכת
  const isIDFound = checkIfIDExists(userID); // פונקציה לדוגמה לבדיקת ID

  if (isIDFound) {
    res.send(`FOUND ID ${userID}`);
  } else {
    res.send(`ID NOT FOUND`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
