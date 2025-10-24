import { NextResponse } from "next/server";
// testing
export async function GET() {
  return NextResponse.json({
    priceUsd: 1.2345,
    updatedAt: Date.now(),
    oracle: "mock",
    message: "Mock data for bare bones deployment",
  });
}
