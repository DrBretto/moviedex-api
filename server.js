//de9ed7c0-dbf4-11ea-87d0-0242ac130003

require("dotenv").config();

const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`,
];

const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use(function validateBearerToken(req, res, next) {
  console.log("validate bearer token middleware");

  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  // move to the next middleware
  next();
});

console.log(process.env.API_TOKEN);

function handleGetTypes(req, res) {}

app.get("/types", handleGetTypes);

function handleGetPokemon(req, res) {
  res.send("Hello, Pokemon!");
}

app.get("/pokemon", handleGetPokemon);

function handleGetTypes(req, res) {
  res.json(validTypes);
}

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
