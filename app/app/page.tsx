"use client";

import Link from "next/link";
import { InsuranceFund } from "@/components/market/InsuranceFund";
import { MarketStats } from "@/components/market/MarketStats";
import { FundingRate } from "@/components/market/FundingRate";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-100">
          🐍 Viper &mdash; Permissionless Perps for Any Token
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          Launch a perpetual futures market for any Solana token in minutes. No
          permission needed.
        </p>
        <Link
          href="/trade"
          className="mt-6 inline-block rounded-xl bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-emerald-400"
        >
          Start Trading
        </Link>
      </div>

      {/* Platform Cards */}
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-emerald-400">
            Launch a Market
          </h3>
          <p className="text-sm text-gray-400">
            Deploy a perp market for any SPL token. Set oracle, seed LP, go
            live. Fully permissionless.
          </p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-emerald-400">
            Trade with Leverage
          </h3>
          <p className="text-sm text-gray-400">
            Up to 10x leverage. On-chain order matching. Real-time funding
            rates. Full transparency.
          </p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-emerald-400">
            Earn as LP
          </h3>
          <p className="text-sm text-gray-400">
            Provide liquidity, earn trading fees. Multiple LP strategies
            available — passive or vAMM.
          </p>
        </div>
      </div>

      {/* Live Insurance Tracker */}
      <div className="mb-8">
        <InsuranceFund />
      </div>

      {/* Market Stats & Funding */}
      <div className="grid gap-6 md:grid-cols-2">
        <MarketStats />
        <FundingRate />
      </div>
    </div>
  );
}
