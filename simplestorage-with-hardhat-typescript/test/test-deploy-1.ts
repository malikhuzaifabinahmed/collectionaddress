import { assert, expect } from "chai";
import { ethers } from "hardhat";
import {
  SimpleStorage,
  simplestorageSol,
  SimpleStorage__factory,
} from "../typechain-types";
describe("SimpleStorage", function () {
  let contractfactory: SimpleStorage__factory;
  let contract: SimpleStorage;
  beforeEach(async () => {
    contractfactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
    contract = await contractfactory.deploy();
  });
  it("Should start with favoroute number of zero", async function () {
    const currentvalue = await contract.retrieve();
    const expectedvalue = "0";
    expect(currentvalue).to.equal(expectedvalue);
  });
  it("Should update when we call", async () => {
    const expectedvalue = 23;
    await contract.store(expectedvalue);
    const currentvalue = await contract.retrieve();
    assert.equal(currentvalue.toNumber(), expectedvalue);
  });
  it("should store name of the person name and favroutenumber", async () => {
    const personname = "name";
    const expectedvalue = "30";
    await contract.addPerson(personname, expectedvalue);
    const currentvalue = await contract.nameToFavoriteNumber(personname);
    assert.equal(currentvalue.toString(), expectedvalue);
  });
});
