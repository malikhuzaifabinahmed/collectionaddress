import { task } from "hardhat/config";

export default task(
  "block-number",
  "Prints the current block number"
).setAction(async () => {
  const blocknumber = await hre.ethers.provider.getBlockNumber();
  console.log(`Current Block number : ${blocknumber}`);
});
