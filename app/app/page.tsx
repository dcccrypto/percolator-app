"use client";

import { useState } from "react";
import Link from "next/link";
import { InsuranceFund } from "@/components/market/InsuranceFund";
import { MarketStats } from "@/components/market/MarketStats";
import { FundingRate } from "@/components/market/FundingRate";

const CONTRACT_ADDRESS = "8PzFWyLpCVEmbZmVJcaRTU5r69XKJx1rd7YGpWvnpump";

function CopyCA() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto mt-6 max-w-xl">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-500">
        Contract Address
      </p>
      <div className="flex items-center gap-2 rounded-lg border border-gray-700/50 bg-gray-900/80 px-4 py-3">
        <a
          href={`https://solscan.io/token/${CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 truncate font-mono text-sm text-[#06d6a0] hover:underline"
        >
          {CONTRACT_ADDRESS}
        </a>
        <button
          onClick={handleCopy}
          className="shrink-0 rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-[#06d6a0]/50 hover:text-[#06d6a0]"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero */}
      <div className="mb-14 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-100">
          $PERC &mdash; Store of Value
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          An inverted perpetual market where PERC is the collateral. Trading
          fees accumulate in the insurance fund. Admin key burned. Fees locked
          forever. Circulating supply only goes down.
        </p>

        <CopyCA />

        <Link
          href="/trade"
          className="mt-6 inline-block rounded-lg bg-[#06d6a0] px-8 py-3 text-sm font-semibold text-gray-950 shadow-lg shadow-[#06d6a0]/20 transition-all hover:bg-[#04b886] hover:shadow-[#06d6a0]/30"
        >
          Start Trading →
        </Link>
      </div>

      {/* SOV Explainer */}
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-sm">
          <h3 className="mb-2 text-lg font-semibold text-[#06d6a0]">
            Trade with PERC
          </h3>
          <p className="text-sm text-gray-400">
            Deposit PERC as collateral to open leveraged perpetual positions.
            Every trade pays a fee to the insurance fund.
          </p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-sm">
          <h3 className="mb-2 text-lg font-semibold text-[#06d6a0]">
            Fees Locked Forever
          </h3>
          <p className="text-sm text-gray-400">
            The admin key has been burned. No one can withdraw fees from the
            insurance fund. They accumulate permanently.
          </p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-sm">
          <h3 className="mb-2 text-lg font-semibold text-[#06d6a0]">
            Supply Shrinks
          </h3>
          <p className="text-sm text-gray-400">
            Every trade removes PERC from circulation into the vault. The more
            trading activity, the more deflationary PERC becomes.
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
