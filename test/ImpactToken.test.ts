import { ethers } from "hardhat";
import { expect } from "chai";

describe("ImpactToken", function () {
  let impactToken: any;
  let deployer: string;
  let firstOwner: string;
  let secondOwner: string;
  let external: string;
  let unprivileged: string;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0].address;
    firstOwner = accounts[1].address;
    secondOwner = accounts[2].address;
    external = accounts[3].address;
    unprivileged = accounts[4].address;

    const ImpactTokenFactory = await ethers.getContractFactory("ImpactToken");
    impactToken = await ImpactTokenFactory.deploy();
    await impactToken.deployed();
  });

  it("should revert if unauthorized call is made", async () => {
    const [_, __, ___, externalSigner] = await ethers.getSigners();

    await expect(
      impactToken
        .connect(externalSigner)
        .publicOrExternalContractMethod("arg1", "arg2") // Replace with real args
    ).to.be.revertedWith("Reason ..."); // Replace with the actual revert reason if known
  });

  describe("Security Tests", function () {
    let newImpactToken: any;

    beforeEach(async () => {
      const ImpactTokenFactory = await ethers.getContractFactory("ImpactToken");
      newImpactToken = await ImpactTokenFactory.deploy();
      await newImpactToken.deployed();
    });

    it("should fail to initialize again", async () => {
      // Assumes the contract uses OpenZeppelin's Initializable pattern
      await expect(newImpactToken.initialize()).to.be.reverted; // or `.to.be.revertedWith(...)`
    });

    it("should return true for thisMethodShouldReturnTrue", async () => {
      expect(await newImpactToken.thisMethodShouldReturnTrue()).to.be.true;
    });
  });
});
