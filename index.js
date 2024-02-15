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

app.get("/", (req, res) => {
  res.json({
    message: "success",
    success: true,
  });
});

// API endpoint to handle form submission
app.post("/submit-plan", (req, res) => {
  const selectedPlan = req.body.selectedPlan; // This should match the name attribute in your AMP form
  console.log("Selected Plan:", selectedPlan);

  // Process the selected plan here and send a response
  res.json({ status: "success", message: `Plan ${selectedPlan} selected!` });
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
