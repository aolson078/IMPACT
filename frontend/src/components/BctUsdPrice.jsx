"use client";
import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";

const PAIR_ABI = [
  {
    type: "function",
    name: "getReserves",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "reserve0", type: "uint112" },
      { name: "reserve1", type: "uint112" },
      { name: "blockTimestampLast", type: "uint32" },
    ],
  },
  {
    type: "function",
    name: "token0",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "token1",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
];

const FEED_ABI = [
  {
    type: "function",
    name: "latestRoundData",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
];

function calculateBctUsdPrice(reserveA, reserveB, usdcUsdPrice) {
  if (!reserveA || !reserveB || !usdcUsdPrice) {
    throw new Error("Missing required parameters for price calculation");
  }
  
  // Scale USDC 6 → 18 decimals
  const reserveB_18 = reserveB * 1_000_000_000_000n;
  
  // USDC per BCT, scaled 1e18
  const usdcPerA_1e18 = (reserveB_18 * 1_000_000_000_000_000_000n) / reserveA;
  
  // Convert to USD
  const bctUsd_1e18 = (usdcPerA_1e18 * BigInt(usdcUsdPrice)) / 100_000_000n;
  
  return Number(bctUsd_1e18) / 1e18;
}

export default function BctUsdPrice({
  label = "BCT",
  pairAddress = "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64",
  tokenA = "0x2F800Db0fdb5223b3C3f354886d907A671414A7F",
  tokenB = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  usdcUsdFeed = "0xfE4A8cc5b5b2366C1B58Bea3858e81843581b2F7",
  className = "",
}) {
  const client = usePublicClient();
  const [priceUsd, setPriceUsd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPrice() {
    console.log("fetchPrice called");
    if (!client) {
      console.log("No client available");
      setError("Wallet not connected.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Starting contract calls");
      // Prefer on-chain oracle if available in deployed addresses
      try {
        const res = await fetch("/api/bct-usd");
        if (res.ok) {
          const data = await res.json();
          if (typeof data.priceUsd === "number") {
            setPriceUsd(data.priceUsd);
            return;
          }
        }
      } catch {}

      // Fallback: do it client-side via pair + feed if API not available
      const [t0, t1] = await Promise.all([
        client.readContract({ address: pairAddress, abi: PAIR_ABI, functionName: "token0" }),
        client.readContract({ address: pairAddress, abi: PAIR_ABI, functionName: "token1" }),
      ]);

      if (!t0 || !t1) {
        throw new Error("Failed to read pair tokens");
      }

      const reserves = await client.readContract({
        address: pairAddress,
        abi: PAIR_ABI,
        functionName: "getReserves",
      });

      const r0 = Array.isArray(reserves) ? reserves[0] : reserves?.reserve0;
      const r1 = Array.isArray(reserves) ? reserves[1] : reserves?.reserve1;
      if (r0 === undefined || r1 === undefined) {
        throw new Error("Failed to read pair reserves");
      }

      const reserve0 = typeof r0 === "bigint" ? r0 : BigInt(r0);
      const reserve1 = typeof r1 === "bigint" ? r1 : BigInt(r1);
      if (reserve0 === 0n || reserve1 === 0n) {
        throw new Error("Empty reserves");
      }

      const isTokenAFirst = t0.toLowerCase() === tokenA.toLowerCase();
      const reserveA = isTokenAFirst ? reserve0 : reserve1;
      const reserveB = isTokenAFirst ? reserve1 : reserve0;

      const latest = await client.readContract({
        address: usdcUsdFeed,
        abi: FEED_ABI,
        functionName: "latestRoundData",
      });
      const answerRaw = Array.isArray(latest) ? latest[1] : latest?.answer;
      if (answerRaw === undefined || answerRaw === null) {
        throw new Error("Feed returned no answer");
      }
      const answer = typeof answerRaw === "bigint" ? answerRaw : BigInt(answerRaw);
      if (answer <= 0n) {
        throw new Error("Feed returned non-positive answer");
      }

      const price = calculateBctUsdPrice(reserveA, reserveB, answer);
      setPriceUsd(price);
    } catch (e) {
      setError(e?.message ?? "Failed to fetch price");
      setPriceUsd(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, pairAddress, tokenA, tokenB, usdcUsdFeed]);

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        onClick={fetchPrice}
        className="px-4 py-2 rounded bg-primary-600 hover:bg-primary-500 text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? `Fetching price...` : `Refresh ${label} Price`}
      </button>

      {error ? (
        <span className="text-red-400 text-sm">{error}</span>
      ) : priceUsd !== null ? (
        <span className="text-xl">
          {label} ≈ ${priceUsd.toFixed(4)} USD
        </span>
      ) : (
        <span className="text-sm text-primary-200/70">Price will appear here</span>
      )}
    </div>
  );
}


