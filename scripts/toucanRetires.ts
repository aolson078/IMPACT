import { ethers } from "hardhat";
import ToucanClient from "toucan-sdk";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseEther } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

async function main() {
  const [signer] = await ethers.getSigners();
  const provider = signer.provider as unknown as JsonRpcProvider;

  const ethSigner = provider.getSigner(signer.address);
  const toucan = new ToucanClient("polygon", provider, ethSigner);

  const tco2Address = "0x..."; // real TCO2 address
  const tco2 = await toucan.getTCO2Contract(tco2Address);
  const balance = await tco2.balanceOf(signer.address);

  console.log("TCO2 balance:", balance.toString());

  const rawAmount = parseEther("0.01");
  const amount = BigNumber.from(rawAmount.toString());

  // Set for stable coin used to purchase casrbon offsets
  const USDC = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

  const tx = await toucan.autoOffsetExactInToken(USDC, "NCT", amount);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
