import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for bare bones deployment
  return NextResponse.json({
    priceUsd: 1.2345,
    updatedAt: Date.now(),
    oracle: "mock",
    message: "Mock data for bare bones deployment",
  });
}
