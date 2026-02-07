"use client";

import { useState } from "react";
import Link from "next/link";
import { InsuranceFund } from "@/components/market/InsuranceFund";
import { MarketStats } from "@/components/market/MarketStats";
import { FundingRate } from "@/components/market/FundingRate";

const CA = "8PzFWyLpCVEmbZmVJcaRTU5r69XKJx1rd7YGpWvnpump";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Hero */}
      <div className="mb-6 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white">
          $PERC &mdash; Store of Value
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          An inverted perpetual market where PERC is the collateral. Trading
          fees accumulate in the insurance fund. Admin key burned. Fees locked
          forever. Circulating supply only goes down.
        </p>
      </div>

      {/* Contract Address */}
      <div className="mb-12 flex justify-center">
        <button
          onClick={copyCA}
          className="group flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-3 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">CA</span>
          <code className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
            {CA}
          </code>
          <span className="text-xs text-emerald-400 min-w-[3rem]">
            {copied ? "✓ Copied" : "Copy"}
          </span>
        </button>
      </div>

      {/* Feature Cards */}
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-[#111318] p-6 transition-all hover:border-emerald-500/30">
          <h3 className="mb-2 text-lg font-semibold text-white">
            Trade with PERC
          </h3>
          <p className="text-sm text-gray-400">
            Deposit PERC as collateral to open leveraged perpetual positions.
            Every trade pays a fee to the insurance fund.
          </p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-[#111318] p-6 transition-all hover:border-emerald-500/30">
          <h3 className="mb-2 text-lg font-semibold text-white">
            Fees Locked Forever
          </h3>
          <p className="text-sm text-gray-400">
            The admin key has been burned. No one can withdraw fees from the
            insurance fund. They accumulate permanently.
          </p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-[#111318] p-6 transition-all hover:border-emerald-500/30">
          <h3 className="mb-2 text-lg font-semibold text-white">
            Supply Shrinks
          </h3>
          <p className="text-sm text-gray-400">
            Every trade removes PERC from circulation into the vault. The more
            trading activity, the more deflationary PERC becomes.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mb-12 text-center">
        <Link
          href="/trade"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-black transition-colors hover:bg-emerald-400"
        >
          Start Trading →
        </Link>
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
