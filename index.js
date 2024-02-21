const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS headers for AMP to work in development, adjust for production
app.use((req, res, next) => {
  res.setHeader(
    "AMP-Access-Control-Allow-Source-Origin",
    `http://${req.headers.host}`
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Dice game, lucky seven

const dice = [1, 2, 3, 4, 5, 6];

const rollDice = () => {
  die1 = Math.floor(Math.random() * 6) + 1;
  die2 = Math.floor(Math.random() * 6) + 1;
  return die1 + die2;
};

const getResult = () => {
  let result = rollDice();

  if (result >= 7)
    return {
      number: result,
    };
  else
    return {
      number: result,
    };
};

app.get("/", (req, res) => {
  res.json({
    message: "success",
    success: true,
  });
});

app.get("/dieroll", (req, res) => {
  console.log(req.query.email);
  res.json({
    items: [getResult()],
  });
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
