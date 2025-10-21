"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-blackish-300/60">
      <Link href="/" className="text-primary-400 font-semibold tracking-wide">
        IMPACT
      </Link>
      <nav className="space-x-4 text-sm">
        <Link className="hover:text-primary-300 transition" href="/verify">
          Verify
        </Link>
        <Link className="hover:text-primary-300 transition" href="/stake">
          Stake
        </Link>
        <Link className="hover:text-primary-300 transition" href="/stats">
          Stats
        </Link>
      </nav>
    </header>
  );
}


