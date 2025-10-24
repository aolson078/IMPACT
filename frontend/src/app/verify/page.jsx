"use client";
import { useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setVerificationResult(null);
    }
  };

  const handleVerify = async () => {
    if (!selectedImage) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const verified = Math.random() > 0.3; // 70% success rate for demo
      setVerificationResult({
        verified: verified,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100% confidence
        description: verified 
          ? "Image shows clear evidence of ecological activity" 
          : "Unable to verify ecological impact from this image"
      });
      setIsVerifying(false);
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
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
            background: 'linear-gradient(45deg, #9C27B0, #673AB7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Verify Impact
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Upload images of your ecological activities to verify and earn IMPACT tokens
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid rgba(156, 39, 176, 0.3)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Image Upload */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem' 
              }}>
                Upload Image
              </label>
              <div style={{
                border: '2px dashed rgba(255,255,255,0.3)',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.3s'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  style={{ cursor: 'pointer', display: 'block' }}
                >
                  {selectedImage ? (
                    <div>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        style={{
                          maxHeight: '300px',
                          margin: '0 auto',
                          borderRadius: '8px',
                          marginBottom: '1rem'
                        }}
                      />
                      <p style={{ color: '#a0a0a0', margin: 0 }}>{selectedImage.name}</p>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
                      <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                        Click to upload or drag and drop
                      </p>
                      <p style={{ fontSize: '0.9rem', color: '#a0a0a0', opacity: 0.7, margin: 0 }}>
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Verification Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={handleVerify}
                disabled={!selectedImage || isVerifying}
                style={{
                  padding: '1rem 2rem',
                  background: isVerifying 
                    ? 'linear-gradient(45deg, #666, #777)' 
                    : 'linear-gradient(45deg, #9C27B0, #673AB7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: isVerifying ? 'not-allowed' : 'pointer',
                  opacity: isVerifying ? 0.7 : 1,
                  transform: isVerifying ? 'none' : 'scale(1.05)',
                  transition: 'all 0.2s'
                }}
              >
                {isVerifying ? "Verifying..." : "Verify Image"}
              </button>
            </div>

            {/* Verification Result */}
            {verificationResult && (
              <div style={{
                padding: '1.5rem',
                borderRadius: '8px',
                border: '2px solid',
                backgroundColor: verificationResult.verified 
                  ? 'rgba(76, 175, 80, 0.2)' 
                  : 'rgba(244, 67, 54, 0.2)',
                borderColor: verificationResult.verified 
                  ? 'rgba(76, 175, 80, 0.5)' 
                  : 'rgba(244, 67, 54, 0.5)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '1rem' 
                }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {verificationResult.verified ? "✅" : "❌"}
                  </span>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {verificationResult.verified ? "Verification Successful" : "Verification Failed"}
                  </h3>
                </div>
                <p style={{ 
                  color: '#a0a0a0', 
                  marginBottom: '0.5rem',
                  margin: 0
                }}>
                  Confidence: {verificationResult.confidence}%
                </p>
                <p style={{ 
                  color: '#a0a0a0',
                  margin: 0
                }}>
                  {verificationResult.description}
                </p>
                {verificationResult.verified && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderRadius: '8px',
                    border: '1px solid rgba(76, 175, 80, 0.3)'
                  }}>
                    <p style={{ 
                      color: '#4CAF50', 
                      fontWeight: 'bold', 
                      margin: 0 
                    }}>
                      🎉 You earned 100 IMPACT tokens!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Connect Wallet */}
            <div style={{ 
              textAlign: 'center', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid rgba(255,255,255,0.2)' 
            }}>
              <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>
                Connect your wallet to claim tokens
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
  );
}