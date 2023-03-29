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
    const data = { 
      collectionaddress :"",
      blocknumber: blockNumber,
      isERC721: false
    }
   
    let block;
    try {
      block = await provider.getBlockWithTransactions(blockNumber);
    } catch (e) {
      console.log(e);
      data.blocknumber =blockNumber
      return data;
    }
    data.blocknumber= blockNumber + 1;
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
        data.collectionaddress = address;
        data.isERC721 = true;
        return data;
      }
    }

    console.log(`Now at block = ${blockNumber} also isErc721 = ${data.isERC721}`);
    if (currentBlockNumber <= blockNumber) {
      return "false";
    }
    return data;
  }
};
async function main() {
  //GETS THE PROVIDER SETUP
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/gcPnXAkjhalj6B9hURGo-oAcstQ1bHxX"
  );

  let blockNumber = Number(process.argv[2]);
  let currentBlockNumber = await provider.getBlockNumber();
  let endingblock = Number(process.argv[3]);
  while (true) {
    console.log("i am in first while");
    let data = await blockverifer(
      blockNumber,
      currentBlockNumber,
      provider
    );
    if(data == "false"){
      console.log("ended");
    }
    blockNumber = data.blocknumber;

    console.log(`blocknumber after error ${data.blocknumber}`);
    if (data.isERC721 == true) {
      let dataarray =  Object.entries(data);
      fs.appendFileSync(`./contractaddress${blockNumber}.csv`, dataarray.join(',') + '\n')
    }
    if (data.blocknumber == endingblock)
    {break;}
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
