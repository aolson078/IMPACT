import { NextResponse } from "next/server";
import { JsonRpcProvider, Contract } from "ethers";
import deployed from "../../../../deployed-addresses.json";

const ORACLE_ABI = [
  "function bctUsdPrice() view returns (uint256 price, uint256 lastUpdatedAt)",
];

export async function GET() {
  try {
    const oracle = deployed?.polygon?.bctOracle;
    if (!oracle || oracle === "0x0000000000000000000000000000000000000000") {
      return NextResponse.json(
        { error: "Oracle address not configured" },
        { status: 500 }
      );
    }

    const provider = new JsonRpcProvider(
      process.env.POLYGON_RPC_URL || "https://polygon-rpc.com"
    );
    const c = new Contract(oracle, ORACLE_ABI, provider);
    const [price, updatedAt] = await c.bctUsdPrice();
    const priceUsd = Number(price) / 1e8; // oracle returns 8 decimals

    return NextResponse.json({
      priceUsd,
      updatedAt: Number(updatedAt),
      oracle,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch" },
      { status: 500 }
    );
  }
}
