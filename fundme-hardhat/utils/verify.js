const { run } = require("hardhat");

const verify = async function (contractaddress, args) {
  console.log("Verifying COntract");
  try {
    await run("verify:verify", {
      address: contractaddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(e);
    }
  }
};

module.exports = {
  verify,
};
