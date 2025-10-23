import { NextResponse } from "next/server";
import { JsonRpcProvider, Contract } from "ethers";
import deployed from "../../../../deployed-addresses.json";

const ORACLE_ABI = [
  "function bctUsdPrice() view returns (uint256 price, uint256 lastUpdatedAt)",
];

export async function GET() {
  // Temporary: return mock data to avoid deployment issues
  return NextResponse.json({
    priceUsd: 0.85,
    updatedAt: Date.now(),
    oracle: "mock",
    message: "API temporarily disabled for deployment",
  });
}
