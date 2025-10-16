"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import Link from "next/link";

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [stakeSuccess, setStakeSuccess] = useState(false);

  const userBalance = 20000;
  const stakedAmount = 250;
  const apy = 12.5;
  const totalStaked = 50000;

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    
    setIsStaking(true);

    setTimeout(() => {
      setStakeSuccess(true);
      setIsStaking(false);
      setStakeAmount("");
    }, 2000);
  };

  const handleUnstake = async () => {
    setIsStaking(true);
    // Simulate unstaking process
    setTimeout(() => {
      setStakeSuccess(true);
      setIsStaking(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="inline-block mb-4 text-primary-400 hover:text-primary-300 transition"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-green-500 to-green-700 bg-clip-text text-transparent mb-4">
            Stake Tokens
          </h1>
          <p className="text-primary-200/90 text-lg max-w-2xl mx-auto">
            Stake your IMPACT tokens to earn rewards and support ecological projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Staking Stats */}
          <div className="bg-blackish-400/50 backdrop-blur-sm rounded-xl p-6 border border-green-800/30">
            <h2 className="text-2xl font-bold text-white mb-6">Staking Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blackish-300/50 rounded-lg">
                <span className="text-primary-300">Your Balance</span>
                <span className="text-white font-semibold">{userBalance} IMPACT</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blackish-300/50 rounded-lg">
                <span className="text-primary-300">Staked Amount</span>
                <span className="text-green-400 font-semibold">{stakedAmount} IMPACT</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blackish-300/50 rounded-lg">
                <span className="text-primary-300">APY</span>
                <span className="text-green-400 font-semibold">{apy}%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blackish-300/50 rounded-lg">
                <span className="text-primary-300">Total Staked</span>
                <span className="text-white font-semibold">{totalStaked.toLocaleString()} IMPACT</span>
              </div>
            </div>
          </div>

          {/* Staking Actions */}
          <div className="bg-blackish-400/50 backdrop-blur-sm rounded-xl p-6 border border-green-800/30">
            <h2 className="text-2xl font-bold text-white mb-6">Stake Tokens</h2>
            
            <div className="space-y-6">
              {/* Stake Input */}
              <div className="space-y-2">
                <label className="block text-white font-medium">Amount to Stake</label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full p-4 bg-blackish-300/50 border border-primary-600/50 rounded-lg text-white placeholder-primary-400 focus:border-primary-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setStakeAmount(userBalance.toString())}
                    className="absolute right-2 top-2 px-3 py-1 bg-primary-600 hover:bg-primary-500 text-white text-sm rounded transition-colors"
                  >
                    Max
                  </button>
                </div>
                <p className="text-sm text-primary-400/70">
                  Available: {userBalance} IMPACT
                </p>
              </div>

              {/* Stake Button */}
              <button
                onClick={handleStake}
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > userBalance || isStaking}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
              >
                {isStaking ? "Staking..." : "Stake Tokens"}
              </button>

              {/* Unstake Section */}
              {stakedAmount > 0 && (
                <>
                  <div className="border-t border-primary-800/30 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Unstake Tokens</h3>
                    <p className="text-primary-300 mb-4">
                      You have {stakedAmount} IMPACT tokens staked
                    </p>
                    <button
                      onClick={handleUnstake}
                      disabled={isStaking}
                      className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
                    >
                      {isStaking ? "Processing..." : "Unstake All"}
                    </button>
                  </div>
                </>
              )}

              {/* Success Message */}
              {stakeSuccess && (
                <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-300 font-medium">
                    ✅ Transaction successful! Your tokens have been staked.
                  </p>
                </div>
              )}

              {/* Connect Wallet */}
              <div className="text-center pt-6 border-t border-primary-800/30">
                <p className="text-primary-300 mb-4">Connect your wallet to stake tokens</p>
                <ConnectButton chainStatus="full" showBalance={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
