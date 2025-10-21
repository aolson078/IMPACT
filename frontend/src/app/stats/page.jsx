"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePublicClient } from "wagmi";

import deployedAddresses from "../../../deployed-addresses.json";

const addresses = deployedAddresses["polygon"];

const TOKEN_CONTRACT_ADDRESS = addresses.token;
const VERIFIER_CONTRACT_ADDRESS = addresses.verifier;
const STAKING_CONTRACT_ADDRESS = addresses.staking;
const CARBON_CREDIT_CONTRACT_ADDRESS = addresses.carbonCredit;

export default function StatsPage() {
  const client = usePublicClient();
  const [bctUsd, setBctUsd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const PAIR_ADDRESS = "0x1e67124681b402064cd0abe8ed1b5c79d2e02f64"; // BCT/USDC
  const CHAINLINK_USDC_USD = "0xfE4A8cc5b5b2366C1B58Bea3858e81843581b2F7"; // USDC/USD
  const TOKEN_BCT = "0x2F800Db0fdb5223b3C3f354886d907A671414A7F";
  const TOKEN_USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

  const pairAbi = useMemo(
    () => [
      { type: "function", name: "getReserves", stateMutability: "view", inputs: [], outputs: [
        { name: "reserve0", type: "uint112" }, { name: "reserve1", type: "uint112" }, { name: "blockTimestampLast", type: "uint32" }
      ] },
      { type: "function", name: "token0", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "address" }] },
      { type: "function", name: "token1", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "address" }] },
    ],
    []
  );

  const feedAbi = useMemo(
    () => [
      { type: "function", name: "latestRoundData", stateMutability: "view", inputs: [], outputs: [
        { name: "roundId", type: "uint80" },
        { name: "answer", type: "int256" },
        { name: "startedAt", type: "uint256" },
        { name: "updatedAt", type: "uint256" },
        { name: "answeredInRound", type: "uint80" },
      ] },
      { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint8" }] },
    ],
    []
  );

  async function fetchPrice() {
    if (!client) return;
    setLoading(true);
    setError(null);
    try {
      // Prefer calling our deployed oracle via API route
      const res = await fetch("/api/bct-usd");
      if (res.ok) {
        const data = await res.json();
        if (typeof data.priceUsd === "number") {
          setBctUsd(data.priceUsd);
          return;
        }
      }

      // Fallback to client-side calculation if API not available
      const [t0, t1] = await Promise.all([
        client.readContract({ address: PAIR_ADDRESS, abi: pairAbi, functionName: "token0" }),
        client.readContract({ address: PAIR_ADDRESS, abi: pairAbi, functionName: "token1" }),
      ]);
      const { reserve0, reserve1 } = await client.readContract({ address: PAIR_ADDRESS, abi: pairAbi, functionName: "getReserves" });
      const isTokenAFirst = t0.toLowerCase() === TOKEN_BCT.toLowerCase();
      const reserveBct = BigInt(isTokenAFirst ? reserve0 : reserve1);
      const reserveUsdc = BigInt(isTokenAFirst ? reserve1 : reserve0);
      const reserveUsdc18 = reserveUsdc * 10n ** 12n;
      const usdcPerBct1e18 = (reserveUsdc18 * 10n ** 18n) / reserveBct;
      const [, answer] = await client.readContract({ address: CHAINLINK_USDC_USD, abi: feedAbi, functionName: "latestRoundData" });
      const bctUsd1e18 = (usdcPerBct1e18 * BigInt(answer)) / 10n ** 8n;
      setBctUsd(Number(bctUsd1e18) / 1e18);
    } catch (e) {
      setError(e?.message || "Failed to fetch price");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  // Mock data for other stats
  const platformStats = {
    totalVerifications: 15420,
    totalTokensStaked: 2500000,
    totalCarbonOffset: 1250.5,
    activeUsers: 3240,
    projectsSupported: 45
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="inline-block mb-4 text-primary-400 hover:text-primary-300 transition"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
            Platform Stats
          </h1>
          <p className="text-primary-200/90 text-lg max-w-2xl mx-auto">
            Real-time statistics and carbon credit pricing data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* BCT Price Section */}
          <div className="bg-blackish-400/50 backdrop-blur-sm rounded-xl p-6 border border-blue-800/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">BCT Price</h2>
              <button
                onClick={fetchPrice}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
            
            <div className="space-y-4">
              {error ? (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-300">{error}</p>
                </div>
              ) : bctUsd !== null ? (
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    ${bctUsd.toFixed(4)}
                  </div>
                  <p className="text-primary-300">BCT/USD</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-green-400">↗ +2.4%</span>
                    <span className="text-sm text-primary-400">24h</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-primary-400">Price data will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Connect Wallet */}
          <div className="bg-blackish-400/50 backdrop-blur-sm rounded-xl p-6 border border-primary-800/30">
            <h2 className="text-2xl font-bold text-white mb-6">Wallet Connection</h2>
            <div className="text-center">
              <ConnectButton chainStatus="full" showBalance={false} />
              <p className="text-primary-300 mt-4 text-sm">
                Connect your wallet to view personal stats
              </p>
            </div>
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="bg-blackish-400/50 backdrop-blur-sm rounded-xl p-6 border border-primary-800/30">
          <h2 className="text-2xl font-bold text-white mb-6">Platform Statistics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-blackish-300/50 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {platformStats.totalVerifications.toLocaleString()}
              </div>
              <p className="text-primary-300">Total Verifications</p>
            </div>
            <div className="text-center p-4 bg-blackish-300/50 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {platformStats.totalTokensStaked.toLocaleString()}
              </div>
              <p className="text-primary-300">Tokens Staked</p>
            </div>
            <div className="text-center p-4 bg-blackish-300/50 rounded-lg">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {platformStats.totalCarbonOffset.toLocaleString()}
              </div>
              <p className="text-primary-300">Tons CO₂ Offset</p>
            </div>
            <div className="text-center p-4 bg-blackish-300/50 rounded-lg">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {platformStats.activeUsers.toLocaleString()}
              </div>
              <p className="text-primary-300">Active Users</p>
            </div>
            <div className="text-center p-4 bg-blackish-300/50 rounded-lg">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {platformStats.projectsSupported}
              </div>
              <p className="text-primary-300">Projects Supported</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-blackish-400/50 backdrop-blur-sm rounded-xl p-6 border border-primary-800/30">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            
          </div>
        </div>
      </div>
  );
}
