const { Networkconfig, developmentchains } = require("../Network-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify.js");
require("dotenv").config();
module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  let ethusdpricfeedaddress;
  const chainId = await network.config.chainId;
  console.log(chainId);
  if (developmentchains.includes(network.name)) {
    const ethusdaggregatorv3 = await get("MockV3Aggregator");
    ethusdpricfeedaddress = ethusdaggregatorv3.address;
  } else {
    ethusdpricfeedaddress = Networkconfig[chainId].ethUsdPriceFeed;
  }
  const args = [ethusdpricfeedaddress];
  const fundme = await deploy("FundMe", {
    from: deployer,
    args: args, //uses networkconfig to use contractaddress for maiking pricefeed
    waitConfirmations: network.config.blockconfirmations || 1,
    log: true,
  });
  if (
    !developmentchains.includes(network.name) &&
    process.env.etherscan_apikey
  ) {
    await verify(fundme.address, args);
  }
};
module.exports.tags = ["all", "FundMe"];
