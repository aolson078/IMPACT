const { ethers } = require("hardhat");
const { expect } = require("chai");

describe.skip("ImpactToken", function () {
  let impactToken;
  let deployer;
  let firstOwner;
  let secondOwner;
  let external;
  let unprivileged;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0].address;
    firstOwner = accounts[1].address;
    secondOwner = accounts[2].address;
    external = accounts[3].address;
    unprivileged = accounts[4].address;

    const ImpactTokenFactory = await ethers.getContractFactory("ImpactToken");
    impactToken = await ImpactTokenFactory.deploy();
    await impactToken.deployed?.();
  });

  it("should revert if unauthorized call is made", async () => {
    const [_, __, ___, externalSigner] = await ethers.getSigners();

    await expect(
      impactToken
        .connect(externalSigner)
        .publicOrExternalContractMethod("arg1", "arg2")
    ).to.be.revertedWith("Reason ...");
  });

  describe("Security Tests", function () {
    let newImpactToken;

    beforeEach(async () => {
      const ImpactTokenFactory = await ethers.getContractFactory("ImpactToken");
      newImpactToken = await ImpactTokenFactory.deploy();
      await newImpactToken.deployed?.();
    });

    it("should fail to initialize again", async () => {
      await expect(newImpactToken.initialize()).to.be.reverted;
    });

    it("should return true for thisMethodShouldReturnTrue", async () => {
      expect(await newImpactToken.thisMethodShouldReturnTrue()).to.be.true;
    });
  });
});
