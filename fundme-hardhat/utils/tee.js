const fs = require("fs");
let funmeabi = fs.readFileSync(
  "D:/Blockchain/hhfcccourse/fundme-hardhat/abi/FundMe.json",
  "utf8"
);
let mockv3abi = fs.readFileSync(
  "D:/Blockchain/hhfcccourse/fundme-hardhat/abi/MockV3Aggregator.json"
);
mockv3abi = mockv3abi.toString();
mockv3abi = JSON.parse(mockv3abi)["abi"];
funmeabi = funmeabi.toString();
funmeabi = JSON.parse(funmeabi)["abi"];

module.exports = {
  funmeabi,
  mockv3abi,
};
