"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
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
        // need to create a function to verify the image
        const verified = verifyImage(selectedImage);
      setVerificationResult({
        verified: verified.verified,
        confidence: verified.confidence,
        description: verified.description
      });
      setIsVerifying(false);
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent mb-4">
            Verify Impact
          </h1>
          <p className="text-primary-200/90 text-lg max-w-2xl mx-auto">
            Upload images of your ecological activities to verify and earn IMPACT tokens
          </p>
        </div>

        <div className="bg-blackish-400/50 backdrop-blur-sm rounded-xl p-8 border border-primary-800/30">
          <div className="space-y-8">
            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-white">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-primary-600/50 rounded-lg p-8 text-center hover:border-primary-500/70 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer block"
                >
                  {selectedImage ? (
                    <div className="space-y-2">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <p className="text-primary-300">{selectedImage.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl text-primary-500">📸</div>
                      <p className="text-primary-300">Click to upload or drag and drop</p>
                      <p className="text-sm text-primary-400/70">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Verification Button */}
            <div className="flex justify-center">
              <button
                onClick={handleVerify}
                disabled={!selectedImage || isVerifying}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isVerifying ? "Verifying..." : "Verify Image"}
              </button>
            </div>

            {/* Verification Result */}
            {verificationResult && (
              <div className={`p-6 rounded-lg border-2 ${
                verificationResult.verified 
                  ? "bg-green-900/20 border-green-500/50" 
                  : "bg-red-900/20 border-red-500/50"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">
                    {verificationResult.verified ? "✅" : "❌"}
                  </span>
                  <h3 className="text-xl font-semibold">
                    {verificationResult.verified ? "Verification Successful" : "Verification Failed"}
                  </h3>
                </div>
                <p className="text-primary-200/90">
                  Confidence: {verificationResult.confidence}%
                </p>
                <p className="text-primary-200/90">
                  {verificationResult.description}
                </p>
                {verificationResult.verified && (
                  <div className="mt-4 p-3 bg-green-800/20 rounded border border-green-500/30">
                    <p className="text-green-300 font-medium">
                      🎉 You earned 100 IMPACT tokens!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Connect Wallet */}
            <div className="text-center pt-6 border-t border-primary-800/30">
              <p className="text-primary-300 mb-4">Connect your wallet to claim tokens</p>
              <ConnectButton chainStatus="full" showBalance={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
