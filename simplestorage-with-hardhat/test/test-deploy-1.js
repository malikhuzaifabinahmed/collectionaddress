const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
  let contractfactory
  let contract
  beforeEach(async () => {
    contractfactory = await ethers.getContractFactory("SimpleStorage")
    contract = await contractfactory.deploy()
  })
  it("Should start with favoroute number of zero", async function () {
    const currentvalue = await contract.retrieve()
    const expectedvalue = "0"
    expect(currentvalue).to.equal(expectedvalue)
  })
  it("Should update when we call", async () => {
    const expectedvalue = 23
    await contract.store(expectedvalue)
    const currentvalue = await contract.retrieve()
    assert.equal(currentvalue, expectedvalue)
  })
})
