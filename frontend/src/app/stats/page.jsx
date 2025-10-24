"use client";
import { useState } from "react";
import Link from "next/link";

export default function StatsPage() {
  const [bctUsd, setBctUsd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRefreshPrice = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setBctUsd(1.2345);
      setLoading(false);
    }, 1500);
  };

  // Mock data for platform stats
  const platformStats = {
    totalVerifications: 15420,
    totalTokensStaked: 2500000,
    totalCarbonOffset: 1250.5,
    activeUsers: 3240,
    projectsSupported: 45
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
            background: 'linear-gradient(45deg, #2196F3, #1976D2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Platform Stats
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Real-time statistics and carbon credit pricing data
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* BCT Price Section */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(33, 150, 243, 0.3)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>BCT Price</h2>
              <button
                onClick={handleRefreshPrice}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>
            
            <div>
              {error ? (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(244, 67, 54, 0.2)',
                  border: '1px solid rgba(244, 67, 54, 0.5)',
                  borderRadius: '8px'
                }}>
                  <p style={{ color: '#f44336', margin: 0 }}>{error}</p>
                </div>
              ) : bctUsd !== null ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold', 
                    color: '#2196F3',
                    marginBottom: '0.5rem'
                  }}>
                    ${bctUsd.toFixed(4)}
                  </div>
                  <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>BCT/USD</p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem' 
                  }}>
                    <span style={{ color: '#4CAF50' }}>↗ +2.4%</span>
                    <span style={{ fontSize: '0.9rem', color: '#a0a0a0' }}>24h</span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                  <p style={{ color: '#a0a0a0' }}>Price data will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Connect Wallet */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Wallet Connection
            </h2>
            <div style={{ textAlign: 'center' }}>
              <button style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}>
                Connect Wallet
              </button>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem', margin: 0 }}>
                Connect your wallet to view personal stats
              </p>
            </div>
          </div>
        </div>

        {/* Platform Statistics */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.2)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Platform Statistics
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '1.5rem',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#2196F3',
                marginBottom: '0.5rem'
              }}>
                {platformStats.totalVerifications.toLocaleString()}
              </div>
              <p style={{ color: '#a0a0a0', margin: 0 }}>Total Verifications</p>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '1.5rem',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#4CAF50',
                marginBottom: '0.5rem'
              }}>
                {platformStats.totalTokensStaked.toLocaleString()}
              </div>
              <p style={{ color: '#a0a0a0', margin: 0 }}>Tokens Staked</p>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '1.5rem',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#4CAF50',
                marginBottom: '0.5rem'
              }}>
                {platformStats.totalCarbonOffset.toLocaleString()}
              </div>
              <p style={{ color: '#a0a0a0', margin: 0 }}>Tons CO₂ Offset</p>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '1.5rem',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#9C27B0',
                marginBottom: '0.5rem'
              }}>
                {platformStats.activeUsers.toLocaleString()}
              </div>
              <p style={{ color: '#a0a0a0', margin: 0 }}>Active Users</p>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '1.5rem',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '8px'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#FF9800',
                marginBottom: '0.5rem'
              }}>
                {platformStats.projectsSupported}
              </div>
              <p style={{ color: '#a0a0a0', margin: 0 }}>Projects Supported</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Recent Activity
          </h2>
          <div style={{ 
            padding: '2rem',
            textAlign: 'center',
            color: '#a0a0a0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <p>Activity feed will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}