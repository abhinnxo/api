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
  let dieFace = {};
  const images = {
    one: "https://cdn.discordapp.com/attachments/840877400765759488/1214199650429571072/Group_23.png?ex=65f83e8b&is=65e5c98b&hm=fcb0d5b027e2ed3827e6addfe49c840943a08878084c288ceb444773e486605d&",
    two: "https://cdn.discordapp.com/attachments/840877400765759488/1214199650719105024/Group_24.png?ex=65f83e8b&is=65e5c98b&hm=e7ddd0eea25313206b2389d7465b9db3733df74b4d5943321fcbdb1375b7b1de&",
    three:
      "https://cdn.discordapp.com/attachments/840877400765759488/1214199650983215124/Group_25.png?ex=65f83e8b&is=65e5c98b&hm=3e0ff8c01c0d4dddb7db3f914b28b322ce828d76e6d901a4eb2e1587e893d950&",
    four: "https://cdn.discordapp.com/attachments/840877400765759488/1214199651264110734/Group_26.png?ex=65f83e8b&is=65e5c98b&hm=98686fd4da22af4d19200f0e43b75e34029a1e83de28dd07b59effd7ee35a637&",
    five: "https://cdn.discordapp.com/attachments/840877400765759488/1214199651557707826/Group_27.png?ex=65f83e8b&is=65e5c98b&hm=d1b50570c14bbb2ba11cfcec0511613c57ccbcdbb65ece4ebf7ed61da8ad2308&",
    six: "https://cdn.discordapp.com/attachments/840877400765759488/1214199651838722078/Group_28.png?ex=65f83e8b&is=65e5c98b&hm=0e7fb3e61d5214a55de3cc61fa5b43a63f01ec35cc8562d34fe30e7949b0a706&",
  };

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

  switch (dieSum) {
    case 2:
      dieFace = { one: images.one, two: images.one };
      break;
    case 3:
      dieFace = { one: images.one, two: images.two };
      break;
    case 4:
      dieFace = { one: images.two, two: images.two };
      break;
    case 5:
      dieFace = { one: images.two, two: images.three };
      break;
    case 6:
      dieFace = { one: images.three, two: images.three };
      break;
    case 7:
      dieFace = { one: images.four, two: images.three };
      break;
    case 8:
      dieFace = { one: images.four, two: images.four };
      break;
    case 9:
      dieFace = { one: images.five, two: images.four };
      break;
    case 10:
      dieFace = { one: images.five, two: images.five };
      break;
    case 11:
      dieFace = { one: images.six, two: images.five };
      break;
    case 12:
      dieFace = { one: images.six, two: images.six };
      break;
    default:
      break;
  }

  res.json({
    items: [
      {
        number: dieSum,
        result: winStatus,
        dieFace,
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
          result: true,
        },
      ],
    });
  } else {
    res.json({
      items: [
        {
          number: num,
          result: false,
        },
      ],
    });
  }
});

// function shiftArrayRightContinuously(arr) {
//   // Check if the array has the expected length of 11
//   if (arr.length !== 11) {
//     console.error("Array must have exactly 11 elements.");
//     return;
//   }

//   // Function to shift array right by one position
//   const shiftRight = () => {
//     let lastElement = arr.pop();
//     arr.unshift(lastElement);
//   };

//   // Start shifting
//   const intervalId = setInterval(shiftRight, 1000); // Shift every 1000 milliseconds (1 second)

//   // Generate a random duration between 1 and 10 seconds
//   const stopAfter = Math.random() * (10000 - 1000) + 1000;

//   setTimeout(() => {
//     clearInterval(intervalId); // Stop shifting
//   }, stopAfter);
// }

// // Example usage:
// let myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log("Original array:", myArray);

// shiftArrayRightContinuously(myArray);

// app.get("/numbers", (req, res) => {
//   res.json({
//     items: [
//       {
//         number: 1,
//       },
//       {
//         number: 2,
//       },
//       {
//         number: 3,
//       },
//       {
//         number: 4,
//       },
//       {
//         number: 5,
//       },
//       {
//         number: 6,
//       },
//       {
//         number: 7,
//       },
//       {
//         number: 8,
//       },
//     ],
//   });
// });

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
