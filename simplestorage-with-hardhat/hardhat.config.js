require("@nomicfoundation/hardhat-toolbox")
require("./tasks/blocknumber.js")
require("hardhat-gas-reporter")
require("dotenv").config()
require("solidity-coverage")
const GPrivatekey1 = process.env.Geroli_Private_key
const Grpcurl = process.env.Geroli_Rpc_Url
const etherscan_apikey = process.env.etherscan_apikey
const coincapapikey = process.env.coincapapikey

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: Grpcurl,
      accounts: [GPrivatekey1],
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: etherscan_apikey,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gasReporter.txt",
    noColors: true,
    token: "Matic",
    currency: "USD",
    coinmarketcap: coincapapikey,
  },

  solidity: "0.8.17",
}
