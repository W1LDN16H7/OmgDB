const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const marvelData = require("./data/marvel.json");
const piratesData = require("./data/pirates.json");
const stwData = require("./data/starwars.json");
const hpData = require("./data/hp.json");
const strangerData = require("./data/strangerthings.json");
const authors = require("./data/authors.json");

const totalData = require("./data/total.json");

getCharacterData = (req, res, data) => {
  const filters = req.query;
  const filteredData = data.filter((item) => {
    let isValid = true;
    for (key in filters) {
      isValid = isValid && item[key] === filters[key];
    }
    return isValid;
  });
  res.json(filteredData);
};

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/api/v1/marvel", (req, res) => {
  getCharacterData(req, res, marvelData);
});

app.get("/api/v1/all", (req, res) => {
  getCharacterData(req, res, totalData);
});

app.get("/api/v1/pirates", (req, res) => {
  getCharacterData(req, res, piratesData);
});

app.get("/api/v1/starwars", (req, res) => {
  getCharacterData(req, res, stwData);
});

app.get("/api/v1/hp", (req, res) => {
  getCharacterData(req, res, hpData);
});
app.get("/api/v1/strangerthings", (req, res) => {
  res.send(strangerData);
});

app.get("/api/authors", (req, res) => {
  res.send(authors);
});

app.listen(port, () => {
  console.log("app is listening to port  " + port);
});
