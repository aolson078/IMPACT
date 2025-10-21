import { JsonRpcProvider, Contract } from "ethers";
import deployed from "../../deployed-addresses.json";

// Read on-chain from our deployed oracle
const provider = new JsonRpcProvider("https://polygon-rpc.com");

const oracleAbi = [
  "function bctUsdPrice() view returns (uint256 price, uint256 lastUpdatedAt)",
];

export async function getBctUsdPrice() {
  const oracle = deployed?.polygon?.bctOracle;
  if (!oracle || oracle === "0x0000000000000000000000000000000000000000") {
    throw new Error("Oracle address not configured");
  }
  const c = new Contract(oracle, oracleAbi, provider);
  const [price] = await c.bctUsdPrice();
  // Oracle returns 8 decimals (Chainlink style)
  const formatted = Number(price) / 1e8;
  return { raw: price, formatted };
}
