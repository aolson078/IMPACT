import { ethers } from "hardhat";
import { expect } from "chai";

describe("ImpactVerifier", function () {
  let verifierContract: any;
  let deployer: any;
  let alice: any;
  let bob: any;
  let charlie: any;
  let dave: any;
  let eve: any;
  let frank: any;

  beforeEach(async () => {
    [deployer, alice, bob] = await ethers.getSigners();
    const VerifierFactory = await ethers.getContractFactory("Verifier");
    verifierContract = await VerifierFactory.deploy();
    await verifierContract.waitForDeployment();
  });

  it("initializes with zero verifier address", async () => {
    expect(await verifierContract.getVerifier()).to.equal(ethers.ZeroAddress);
  });

  it("allows anyone to set verifier and enforces onlyVerifier", async () => {
    await verifierContract.connect(alice).setVerifier(alice.address);
    expect(await verifierContract.getVerifier()).to.equal(alice.address);

    await expect(verifierContract.connect(bob).verifySubmittedAction(1n)).to.be
      .reverted;

    await expect(
      verifierContract.connect(alice).verifySubmittedAction(1n)
    ).to.emit(verifierContract, "ActionVerified");
  });

  it("submits an action and emits ActionSubmitted with correct args", async () => {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const action = {
      id: 1n,
      user: deployer.address,
      timestamp: now,
      ipfsLink: "ipfs://cid",
      verified: false,
    };

    await expect(verifierContract.submitActionVerification(action))
      .to.emit(verifierContract, "ActionSubmitted")
      .withArgs(
        action.id,
        action.user,
        action.timestamp,
        action.ipfsLink,
        action.verified
      );

    const stored = await verifierContract.actions(action.id);
    expect(stored.id).to.equal(action.id);
    expect(stored.user).to.equal(action.user);
    expect(stored.timestamp).to.equal(action.timestamp);
    expect(stored.ipfsLink).to.equal(action.ipfsLink);
    expect(stored.verified).to.equal(false);
  });

  it("verifies a previously submitted action and emits ActionVerified with updated flag", async () => {
    const actionId = 42n;
    const action = {
      id: actionId,
      user: alice.address,
      timestamp: 12345n,
      ipfsLink: "ipfs://example",
      verified: false,
    };

    await verifierContract.submitActionVerification(action);

    await verifierContract.setVerifier(bob.address);
    await expect(verifierContract.connect(bob).verifySubmittedAction(actionId))
      .to.emit(verifierContract, "ActionVerified")
      .withArgs(
        action.id,
        action.user,
        action.timestamp,
        action.ipfsLink,
        true
      );

    const stored = await verifierContract.actions(actionId);
    expect(stored.verified).to.equal(true);
  });
});
