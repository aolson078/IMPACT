const { ethers } = require("hardhat");
const ToucanClient = require("toucan-sdk").default;
const { JsonRpcProvider } = require("@ethersproject/providers");
const { parseEther } = require("ethers");
const { BigNumber } = require("@ethersproject/bignumber");

async function main() {
  const [signer] = await ethers.getSigners();
  const provider = signer.provider;

  const ethSigner = provider.getSigner(signer.address);
  const toucan = new ToucanClient("polygon", provider, ethSigner);

  const tco2Address = "0x..."; 
  const tco2 = await toucan.getTCO2Contract(tco2Address);
  const balance = await tco2.balanceOf(signer.address);

  console.log("TCO2 balance:", balance.toString());

  const rawAmount = parseEther("0.01");
  const amount = BigNumber.from(rawAmount.toString());

  const USDC = "0x3c499c542cEF5E381de1192ce70d8cC03d5c3359";

  const tx = await toucan.autoOffsetExactInToken(USDC, "NCT", amount);
  console.log("Offset tx submitted:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
