"use client";
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
    setTimeout(() => {
      setStakeSuccess(true);
      setIsStaking(false);
    }, 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '3rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link 
            href="/" 
            style={{
              display: 'inline-block',
              marginBottom: '1rem',
              color: '#a0a0a0',
              textDecoration: 'none'
            }}
          >
            ← Back to Home
          </Link>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #4CAF50, #2E7D32)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Stake Tokens
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Stake your IMPACT tokens to earn rewards and support ecological projects
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2rem' 
        }}>
          {/* Staking Stats */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(76, 175, 80, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Staking Stats
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#a0a0a0' }}>Your Balance</span>
                <span style={{ fontWeight: 'bold' }}>{userBalance} IMPACT</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#a0a0a0' }}>Staked Amount</span>
                <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{stakedAmount} IMPACT</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#a0a0a0' }}>APY</span>
                <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{apy}%</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#a0a0a0' }}>Total Staked</span>
                <span style={{ fontWeight: 'bold' }}>{totalStaked.toLocaleString()} IMPACT</span>
              </div>
            </div>
          </div>

          {/* Staking Actions */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(76, 175, 80, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Stake Tokens
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Stake Input */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Amount to Stake
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.0"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    onClick={() => setStakeAmount(userBalance.toString())}
                    style={{
                      position: 'absolute',
                      right: '0.5rem',
                      top: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Max
                  </button>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#a0a0a0', marginTop: '0.5rem' }}>
                  Available: {userBalance} IMPACT
                </p>
              </div>

              {/* Stake Button */}
              <button
                onClick={handleStake}
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > userBalance || isStaking}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: isStaking ? 'linear-gradient(45deg, #666, #777)' : 'linear-gradient(45deg, #4CAF50, #2E7D32)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: isStaking ? 'not-allowed' : 'pointer',
                  opacity: isStaking ? 0.7 : 1
                }}
              >
                {isStaking ? "Staking..." : "Stake Tokens"}
              </button>

              {/* Unstake Section */}
              {stakedAmount > 0 && (
                <div style={{ 
                  borderTop: '1px solid rgba(255,255,255,0.2)', 
                  paddingTop: '1.5rem' 
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Unstake Tokens
                  </h3>
                  <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>
                    You have {stakedAmount} IMPACT tokens staked
                  </p>
                  <button
                    onClick={handleUnstake}
                    disabled={isStaking}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: isStaking ? 'linear-gradient(45deg, #666, #777)' : 'linear-gradient(45deg, #FF9800, #F57C00)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      cursor: isStaking ? 'not-allowed' : 'pointer',
                      opacity: isStaking ? 0.7 : 1
                    }}
                  >
                    {isStaking ? "Processing..." : "Unstake All"}
                  </button>
                </div>
              )}

              {/* Success Message */}
              {stakeSuccess && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  border: '1px solid rgba(76, 175, 80, 0.5)',
                  borderRadius: '8px'
                }}>
                  <p style={{ color: '#4CAF50', fontWeight: 'bold', margin: 0 }}>
                    ✅ Transaction successful! Your tokens have been staked.
                  </p>
                </div>
              )}

              {/* Connect Wallet */}
              <div style={{ 
                textAlign: 'center', 
                paddingTop: '1.5rem', 
                borderTop: '1px solid rgba(255,255,255,0.2)' 
              }}>
                <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>
                  Connect your wallet to stake tokens
                </p>
                <button style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}