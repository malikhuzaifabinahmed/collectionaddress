const { ethers, run, network } = require("hardhat")

async function main() {
  const contractfactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract")
  const simplestorage = await contractfactory.deploy()

  console.log(`deployed at address = ${(await simplestorage).address}`)

  if (network.config.chainId === 5 && process.env.etherscan_apikey) {
    await simplestorage.deployTransaction.wait(6)
    const address = (await simplestorage).address
    await verify(address, [])
  }
}
async function verify(conractaddress, args) {
  console.log("verifying Contract")
  try {
    await run("verify:verify", {
      address: conractaddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    } else {
      console.log(e)
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
