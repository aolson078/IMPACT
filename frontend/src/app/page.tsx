"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import deployedAddresses from "../../deployed-addresses.json";

const addresses = deployedAddresses["polygon"];

const TOKEN_CONTRACT_ADDRESS = addresses.token as `0x${string}`;
const VERIFIER_CONTRACT_ADDRESS = addresses.verifier as `0x${string}`;
const STAKING_CONTRACT_ADDRESS = addresses.staking as `0x${string}`;
const CARBON_CREDIT_CONTRACT_ADDRESS = addresses.carbonCredit as `0x${string}`;

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-8 py-32">
      <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent">
        IMPACT Dashboard
      </h1>
      <p className="max-w-xl text-primary-200/90">
        IMPACT is a ReFi (Regenerative Finance) project built on Polygon. The
        platform aims to incentivize ecologicaly beneficial behavior by
        rewarding users for planting trees and other ecological activities.
      </p>
      <div className="flex gap-4">
        <ConnectButton chainStatus="full" showBalance={false} />
      </div>
    </section>
  );
}
