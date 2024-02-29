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
const rollDice = () => {
  die1 = Math.floor(Math.random() * 6) + 1;
  die2 = Math.floor(Math.random() * 6) + 1;
  return die1 + die2;
};

app.get("/", (req, res) => {
  res.json({
    message: "success",
    success: true,
  });
});

app.get("/dieroll", (req, res) => {
  console.log(req.query.selectedValue);

  const selectedValue = req.query.selectedValue;
  const dieSum = rollDice();
  let winStatus = 0;

  switch (selectedValue) {
    case "1":
      if (dieSum < 7) winStatus = 1;
      break;
    case "2":
      if (dieSum > 7) winStatus = 1;
      break;
    case "3":
      if (dieSum == 7) winStatus = 1;
      break;

    default:
      console.log("some error occured");
      break;
  }

  res.json({
    items: [
      {
        number: dieSum,
        result: winStatus,
      },
    ],
  });
});

// roulette
let randomNumber = () => Math.floor(Math.random() * 11);

app.get("/roulette", (req, res) => {
  let selectedOption = req.query.selectedOption;
  let num = randomNumber();

  if (selectedOption == num) {
    res.json({
      items: [
        {
          number: num,
          result: "WON",
        },
      ],
    });
  } else {
    res.json({
      items: [
        {
          number: num,
          result: "LOSS",
        },
      ],
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
