require("@nomicfoundation/hardhat-toolbox")
require("./tasks/blocknumber.js")
require("dotenv").config()

const GPrivatekey1 = process.env.Geroli_Private_key
const Grpcurl = process.env.Geroli_Rpc_Url
const etherscan_apikey = process.env.etherscan_apikey

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    goerli: {
      url: Grpcurl,
      accounts: [GPrivatekey1],
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: etherscan_apikey,
  },
  solidity: "0.8.17",
}
