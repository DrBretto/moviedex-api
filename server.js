require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

const MOVIES = require("./movies-data.json");

app.use(morgan("dev"));
app.use(validateBearerToken);
app.use(cors());
app.use(helmet());

app.get("/movie", handleGetMovie);

function validateBearerToken(req, res, next) {
  console.log("validate bearer token middleware");
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  console.log("validateBearerToken -> authToken", authToken);
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
}

function handleGetMovie(req, res) {
  let response = MOVIES;

  if (req.query.genre) {
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  if (req.query.country) {
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  if (req.query.avg_vote) {
    response = response.filter(
      (movie) => parseFloat(movie.avg_vote) >= parseFloat(req.query.avg_vote)
    );
  }

  res.json(response);
}

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
