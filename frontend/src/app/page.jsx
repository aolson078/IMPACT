"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-12 py-32">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent">
          IMPACT
        </h1>
        <p className="max-w-xl text-primary-200/90 text-lg">
          ReFi platform for ecological verification, staking, and impact tracking
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <Link
          href="/verify"
          className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary-500/25"
        >
          Verify
        </Link>
        <Link
          href="/stake"
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
        >
          Stake
        </Link>
        <Link
          href="/stats"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
        >
          Stats
        </Link>
      </div>

      <div className="mt-8">
        <ConnectButton chainStatus="full" showBalance={false} />
      </div>
    </section>
  );
}


