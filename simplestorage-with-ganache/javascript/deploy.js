//this script is used to deploy contract on blockchain
const fs = require("fs");
const ethers = require("ethers");
const { getIcapAddress } = require("ethers/lib/utils");
require("dotenv").config();
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.Rpc_url);
  const encryptedjson = await fs.readFileSync(".encryptedkey.json", "utf-8");
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedjson,
    process.env.Password
  );
  wallet = await wallet.connect(provider);
  const bin = fs.readFileSync(
    "./Contractsdata/Contracts_Simplestorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const abi = fs.readFileSync(
    "./Contractsdata/Contracts_Simplestorage_sol_SimpleStorage.abi",
    "utf-8"
  );

  const contractfactory = new ethers.ContractFactory(abi, bin, wallet);

  const contract = await contractfactory.deploy();

  const trasactionrecipt = await contract.deployTransaction.wait(1);
  const deploymentrecipt = contract.deployTransaction;
  console.log("here is the transaction recipt ", trasactionrecipt);
  console.log("here is the deployment recipt", deploymentrecipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
