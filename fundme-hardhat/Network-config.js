const Networkconfig = {
  5: {
    name: "Georli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  1: {
    name: "Ethereum-mainnet",
    ethUsdPriceFeed: "0xaEA2808407B7319A31A383B6F8B60f04BCa23cE2",
  },
};
const decimals = 8;
const initialAnswer = 159959000000;

const developmentchains = ["hardhat", "localhost"];
module.exports = {
  Networkconfig,
  developmentchains,
  decimals,
  initialAnswer,
};
