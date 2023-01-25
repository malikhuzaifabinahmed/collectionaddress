const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();
async function main() {
  const wallet = new ethers.Wallet(process.env.Private_key);
  const encrytedkey = await wallet.encrypt(
    process.env.Password,
    process.env.Private_key
  );
  fs.writeFileSync("./.encryptedkey.json", encrytedkey);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
