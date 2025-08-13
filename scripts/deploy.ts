import { ethers } from "hardhat";
import { parseEther } from "ethers";
import { ERC20Mintable, TCO2Mock, OffsetMock } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  const Mintable = await ethers.getContractFactory("ERC20Mintable");
  const inputToken = (await Mintable.deploy(
    "Test USD Coin",
    "tUSDC",
    deployer.address
  )) as unknown as ERC20Mintable;
  const nctToken = (await Mintable.deploy(
    "Nature Carbon Tonne",
    "NCT",
    deployer.address
  )) as unknown as ERC20Mintable;

  console.log("inputToken deployed at:", inputToken.target);
  console.log("NCT deployed at:", nctToken.target);

  const TCO2 = await ethers.getContractFactory("TCO2Mock");
  const tco2Token = (await TCO2.deploy(
    deployer.address
  )) as unknown as TCO2Mock;
  console.log("TCO2 deployed at:", tco2Token.target);

  const Offset = await ethers.getContractFactory("OffsetMock");
  const offsetMock = (await Offset.deploy(
    inputToken.target,
    nctToken.target,
    tco2Token.target,
    deployer.address
  )) as unknown as OffsetMock;

  console.log("OffsetMock deployed at:", offsetMock.target);

  await inputToken.mint(deployer.address, parseEther("1000"));
  console.log("Minted 1000 testUSDC to deployer");

  console.log("Deployment complete");
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});
