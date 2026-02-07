"use client";

import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTrade } from "@/hooks/useTrade";
import { useUserAccount } from "@/hooks/useUserAccount";
import { useEngineState } from "@/hooks/useEngineState";

export const TradeForm: FC = () => {
  const { connected } = useWallet();
  const userAccount = useUserAccount();
  const { trade, loading, error } = useTrade();
  const { params } = useEngineState();

  const [direction, setDirection] = useState<"long" | "short">("long");
  const [sizeInput, setSizeInput] = useState("");
  const [lpIdx, setLpIdx] = useState("0");
  const [lastSig, setLastSig] = useState<string | null>(null);

  if (!connected) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center shadow-sm">
        <p className="text-gray-500">Connect your wallet to trade</p>
      </div>
    );
  }

  if (!userAccount) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center shadow-sm">
        <p className="text-gray-500">
          No account found. Go to Dashboard to create one.
        </p>
      </div>
    );
  }

  const leverage = params
    ? (10000n / params.initialMarginBps).toString()
    : "?";

  async function handleTrade() {
    if (!sizeInput || !userAccount) return;

    try {
      const rawSize = BigInt(sizeInput);
      const size = direction === "short" ? -rawSize : rawSize;
      const sig = await trade({
        lpIdx: parseInt(lpIdx),
        userIdx: userAccount.idx,
        size,
      });
      setLastSig(sig ?? null);
      setSizeInput("");
    } catch {
      // error is set by hook
    }
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
        Trade
      </h3>

      {/* Direction toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setDirection("long")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            direction === "long"
              ? "bg-[#06d6a0] text-gray-950"
              : "bg-gray-800 text-gray-500 hover:bg-gray-700"
          }`}
        >
          Long
        </button>
        <button
          onClick={() => setDirection("short")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            direction === "short"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-500 hover:bg-gray-700"
          }`}
        >
          Short
        </button>
      </div>

      {/* Size input */}
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-500">
          Size (native units)
        </label>
        <input
          type="text"
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
          placeholder="1000000"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-[#06d6a0] focus:outline-none focus:ring-1 focus:ring-[#06d6a0]"
        />
      </div>

      {/* LP Index */}
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-500">LP Index</label>
        <input
          type="text"
          value={lpIdx}
          onChange={(e) => setLpIdx(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-[#06d6a0] focus:outline-none focus:ring-1 focus:ring-[#06d6a0]"
        />
      </div>

      {/* Info */}
      <div className="mb-4 text-xs text-gray-500">
        <p>Max Leverage: {leverage}x</p>
        <p>Account Index: {userAccount.idx}</p>
      </div>

      {/* Submit */}
      <button
        onClick={handleTrade}
        disabled={loading || !sizeInput}
        className="w-full rounded-lg bg-[#06d6a0] text-gray-950 py-3 text-sm font-medium transition-colors hover:bg-[#04b886] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending..." : `${direction === "long" ? "Long" : "Short"} PERC`}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}

      {lastSig && (
        <p className="mt-2 text-xs text-gray-500">
          Tx:{" "}
          <a
            href={`https://explorer.solana.com/tx/${lastSig}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#06d6a0] hover:underline"
          >
            {lastSig.slice(0, 16)}...
          </a>
        </p>
      )}
    </div>
  );
};
