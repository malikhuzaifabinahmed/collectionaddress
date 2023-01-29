const {
  developmentchains,
  decimals,
  initialAnswer,
} = require("../Network-config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (developmentchains.includes(network.name)) {
    log("Local network detected");
    await deploy("MockV3Aggregator", {
      from: deployer,
      args: [decimals, initialAnswer],
      log: true,
    });
    log("deploying Mock AggregatorV3 contract.....");
    log("__________----____________----___________----_____________");
  }
};
module.exports.tags = ["all", "mocks"];
