const express = require("express");
const path = require("path");
const moment = require("moment");
const { HOST } = require("./src/constants");
const db = require("./src/database");
const basePath = process.cwd();
const fs = require("fs");
const { formatEther, formatUnits } = require("@ethersproject/units");
const contracts = require("./contracts");

const PORT = process.env.PORT || 5000;

const app = express()
  .set("port", PORT)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs");

app.use(express.json());

// Static public files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.send("Get ready for OpenSea!");
});

app.get("/token/apes/:token_id", async function (req, res) {
  const response = await contracts.ExoticApeContract.totalSupply();
  const totalSupply = formatUnits(response, 0);
  const tokenId = Number(req.params.token_id);
  if (0 < tokenId && tokenId <= totalSupply) {
    let rawdata = fs.readFileSync(`${basePath}/metadatas/apes/${tokenId}.json`);
    let metadata = JSON.parse(rawdata);

    res.send(metadata);
  } else {
    res.status(400).json({ error: "The tokenId is not minted" });
  }
});

app.get("/token/babes/:token_id", async function (req, res) {
  const response = await contracts.BeachBabeContract.totalSupply();
  const totalSupply = formatUnits(response, 0);
  const tokenId = Number(req.params.token_id);
  if (0 < tokenId && tokenId <= totalSupply) {
    let rawdata = fs.readFileSync(
      `${basePath}/metadatas/babes/${tokenId}.json`
    );
    let metadata = JSON.parse(rawdata);

    res.send(metadata);
  } else {
    res.status(400).json({ error: "The tokenId is not minted" });
  }
});

app.get("/token/bums/:token_id", async function (req, res) {
  const response = await contracts.BeachBumContract.totalSupply();
  const totalSupply = formatUnits(response, 0);
  const tokenId = Number(req.params.token_id);
  if (0 < tokenId && tokenId <= totalSupply) {
    let rawdata = fs.readFileSync(`${basePath}/metadatas/bums/${tokenId}.json`);
    let metadata = JSON.parse(rawdata);

    res.send(metadata);
  } else {
    res.status(400).json({ error: "The tokenId is not minted" });
  }
});

app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});

// returns the zodiac sign according to day and month ( https://coursesweb.net/javascript/zodiac-signs_cs )
function zodiac(day, month) {
  var zodiac = [
    "",
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
  ];
  var last_day = ["", 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
  return day > last_day[month] ? zodiac[month * 1 + 1] : zodiac[month];
}

function monthName(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1];
}
