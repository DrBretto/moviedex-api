//de9ed7c0-dbf4-11ea-87d0-0242ac130003

require('dotenv').config()

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

console.log(process.env.API_TOKEN)

function handleGetTypes(req, res) {}

app.get("/types", handleGetTypes);


function handleGetTypes(req, res) {
  res.json(validTypes);
}

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
