const ethers = require("ethers");
const request = require("request");
const fs = require("fs");
const { getContractAddress } = require("ethers/lib/utils");
const { abi } = require("./abi.js");

const handleError = () => {
  return undefined;
};
const getContractMetadata = async (address, provider) => {
  const abi = [
    "function name() view returns (string name)",
    "function symbol() view returns (string symbol)",
    "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  ];
  const contract = new ethers.Contract(address, abi, provider);
  const [name, symbol, isERC721, isERC1155] = await Promise.all([
    contract.name().catch(handleError),
    contract.symbol().catch(handleError),
    contract.supportsInterface("0x80ac58cd").catch(handleError),
    contract.supportsInterface("0xd9b67a26").catch(handleError),
  ]);
  return { name, symbol, isERC721, isERC1155 };
};

blockverifer = async (blockNumber, currentBlockNumber, provider) => {
  while (true) {
    console.log("blockverifier started");
    let block;
    try {
      block = await provider.getBlockWithTransactions(blockNumber);
    } catch (e) {
      console.log(e);
      return blockNumber;
    }
    blockNumber = blockNumber + 1;
    // LOOKS FOR CONTRACT CREATION TRANSACTION IN TRANSACTIONS OF BLOCKCHAIN
    const contracts = block.transactions.filter((tx) => Boolean(tx.creates));
    //looks for each contract creation
    for (const contract of contracts) {
      address = contract.creates;
      let metadata = await getContractMetadata(address, provider);
      //iS CONTRACT CREATED IS ERC721
      if (metadata.isERC721) {
        console.log("this is a erc721 contract address");
        console.log(
          "this is the starting block number for erc721 = ",
          blockNumber
        );
        return -1;
      }
    }
    console.log(`Now at block = ${blockNumber}`);
    if (currentBlockNumber <= blockNumber) {
      return -1;
    }
  }
};
async function main() {
  //GETS THE PROVIDER SETUP
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/gcPnXAkjhalj6B9hURGo-oAcstQ1bHxX"
  );

  let blockNumber = 46264
  ;
  let currentBlockNumber = await provider.getBlockNumber();
  while (true) {
    console.log("i am in first while");
    let blocknumber = await blockverifer(
      blockNumber,
      currentBlockNumber,
      provider
    );
    blockNumber = blocknumber;

    console.log(`blocknumber after error ${blocknumber}`);
    if (blocknumber === -1) {
      break;
    }
  }
}

// TO LOOK FOR TOTAL SUPPLY OF A CONTRACT OR COLLLECTION
// const contract = new ethers.Contract(address, abi, provider);
// const [totalSupply] = await Promise.all([
//   contract.totalSupply().catch(handleError),
// ]);

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });