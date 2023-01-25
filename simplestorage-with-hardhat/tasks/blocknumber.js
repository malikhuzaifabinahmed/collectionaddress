const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(async () => {
  const blocknumber = await hre.ethers.provider.getBlockNumber()
  console.log(`Current Block number : ${blocknumber}`)
})

module.exports = {}
