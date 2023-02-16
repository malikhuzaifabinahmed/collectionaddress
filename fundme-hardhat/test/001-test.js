const { deployments, getNamedAccounts, ethers } = require("hardhat");
const { assert, expect } = require("chai");
// const { funmeabi, mockv3abi } = require("../utils/tee.js");
//const ethers = require("ethers");
describe("FundmMe test", () => {
  let fundme;
  let deployer;
  let MockV3Aggregator;
  let sendvalue = ethers.utils.parseEther("1");
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    MockV3Aggregator = await ethers.getContract(["MockV3Aggregator"]);
    fundme = await ethers.getContract(["FundMe"]);
  });

  // beforeEach(async () => {
  //   deployer = (await getNamedAccounts()).deployer;
  //   // await deployments.fixture(["all"]);
  //   console.log("in pricefeed test");
  //   MockV3Aggregator = await new ethers.Contract(
  //     "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  //     mockv3abi
  //   );
  //   fundme = await new ethers.Contract(
  //     "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
  //     funmeabi
  //   );
  // });

  //test starts here
  describe("Testing Constructor", () => {
    it("Construstor pricefeed contract address argument is correct", async () => {
      console.log("in pricefeed test");
      const currentpricefeed = await fundme._pricefeedadress();
      const expectedvalue = await MockV3Aggregator.address;
      assert.equal(currentpricefeed, expectedvalue);
    });

    it("Construstor owner address argument is correct", async () => {
      const currentowner = await fundme.i_owner();
      const expectedvalue = deployer;
      assert.equal(currentowner, expectedvalue);
    });
  });

  describe("testing Fund function", () => {
    it("testing fund function minimum eth", async () => {
      await expect(fundme.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      );
    });
    it("updated the amount of the fund", async () => {
      await fundme.fund({ value: sendvalue });
      const currentvalue = await fundme.addressToAmountFunded(deployer);
      const expectedvalue = sendvalue;
      assert.equal(currentvalue.toString(), expectedvalue.toString());
    });

    it("Adds funder to funders array", async () => {
      await fundme.fund({ value: sendvalue });
      const funder = await fundme.funders(0);
      assert.equal(funder, deployer);
    });
  });

  describe("Testing withdraw function", () => {
    beforeEach(async () => {
      await fundme.fund({ value: sendvalue });
    });

    it("withdraw eth correctly with single funder", async () => {
      //Arrange

      const intialbalancefundme = await fundme.provider.getBalance(
        fundme.address
      );
      const intialbalancedeployer = await fundme.provider.getBalance(deployer);
      // act;
      const transactionresponse = await fundme.withdraw();
      const transactionrecipt = await transactionresponse.wait(1);
      const { effectiveGasPrice, gasUsed } = transactionrecipt;
      const GasUsed = effectiveGasPrice.mul(gasUsed);

      const finalbalancefundme = await ethers.provider.getBalance(
        fundme.address
      );

      const finalbalancedeployer = await ethers.provider.getBalance(deployer);

      //asert

      assert.equal(finalbalancefundme.toString(), 0);
      assert.equal(
        intialbalancedeployer.add(intialbalancefundme).toString(),
        finalbalancedeployer.add(GasUsed).toString()
      );
    });

    it("withdraw eth correctly with Multiple funders", async () => {
      //Arrange
      for (i = 0; i < 6; i++) {
        const accounts = ethers.getSigners();
        fundmeconnectedwithaccount = await fundme.connect(accounts[i]);
        fundmeconnectedwithaccount.fund(sendvalue);
      }

      const intialbalancefundme = await fundme.provider.getBalance(
        fundme.address
      );
      const intialbalancedeployer = await fundme.provider.getBalance(deployer);
      // act;
      const transactionresponse = await fundme.withdraw();
      const transactionrecipt = await transactionresponse.wait(1);
      const { effectiveGasPrice, gasUsed } = transactionrecipt;
      const GasUsed = effectiveGasPrice.mul(gasUsed);

      const finalbalancefundme = await ethers.provider.getBalance(
        fundme.address
      );

      const finalbalancedeployer = await ethers.provider.getBalance(deployer);

      //asert

      assert.equal(finalbalancefundme.toString(), 0);
      assert.equal(
        intialbalancedeployer.add(intialbalancefundme).toString(),
        finalbalancedeployer.add(GasUsed).toString()
      );
    });
    it("Don't Allow us to withdraw except owner", async () => {
      const accounts = await ethers.getSigners();
      const attackers = accounts[1];
      const attackerconnectedfundme = await fundme.connect(attackers);
      await expect(
        attackerconnectedfundme.withdraw()
      ).to.be.revertedWithCustomError(attackerconnectedfundme, "NotOwner");
    });

    it("cheapwithdraw eth correctly with single funder", async () => {
      //Arrange

      const intialbalancefundme = await fundme.provider.getBalance(
        fundme.address
      );
      const intialbalancedeployer = await fundme.provider.getBalance(deployer);
      // act;
      const transactionresponse = await fundme.cheaperwithdraw();
      const transactionrecipt = await transactionresponse.wait(1);
      const { effectiveGasPrice, gasUsed } = transactionrecipt;
      const GasUsed = effectiveGasPrice.mul(gasUsed);

      const finalbalancefundme = await ethers.provider.getBalance(
        fundme.address
      );

      const finalbalancedeployer = await ethers.provider.getBalance(deployer);

      //asert

      assert.equal(finalbalancefundme.toString(), 0);
      assert.equal(
        intialbalancedeployer.add(intialbalancefundme).toString(),
        finalbalancedeployer.add(GasUsed).toString()
      );
    });

    it("cheaperwithdraw eth correctly with Multiple funders", async () => {
      //Arrange
      for (i = 0; i < 6; i++) {
        const accounts = ethers.getSigners();
        fundmeconnectedwithaccount = await fundme.connect(accounts[i]);
        fundmeconnectedwithaccount.fund(sendvalue);
      }

      const intialbalancefundme = await fundme.provider.getBalance(
        fundme.address
      );
      const intialbalancedeployer = await fundme.provider.getBalance(deployer);
      // act;
      const transactionresponse = await fundme.cheaperwithdraw();
      const transactionrecipt = await transactionresponse.wait(1);
      const { effectiveGasPrice, gasUsed } = transactionrecipt;
      const GasUsed = effectiveGasPrice.mul(gasUsed);

      const finalbalancefundme = await ethers.provider.getBalance(
        fundme.address
      );

      const finalbalancedeployer = await ethers.provider.getBalance(deployer);

      //asert

      assert.equal(finalbalancefundme.toString(), 0);
      assert.equal(
        intialbalancedeployer.add(intialbalancefundme).toString(),
        finalbalancedeployer.add(GasUsed).toString()
      );
    });
  });
});
