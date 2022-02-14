const ethers = require("ethers");

const ExoticApeAbi = require("./abi/ExoticApeAbi.json");
const BeachBumAbi = require("./abi/BeachBumAbi.json");
const BeachBabeAbi = require("./abi/BeachBabeAbi.json");
const addresses = require("./address");

const Web3Provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
);

const BeachBumContract = new ethers.Contract(
  addresses.BeachBumAddress,
  BeachBumAbi,
  Web3Provider
);

const ExoticApeContract = new ethers.Contract(
  addresses.ExoticApeAddress,
  ExoticApeAbi,
  Web3Provider
);

const BeachBabeContract = new ethers.Contract(
  addresses.BeachBabeAddress,
  BeachBabeAbi,
  Web3Provider
);

module.exports = {
  BeachBumContract,
  ExoticApeContract,
  BeachBabeContract
}