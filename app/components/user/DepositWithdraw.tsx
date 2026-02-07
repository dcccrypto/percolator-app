"use client";

import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserAccount } from "@/hooks/useUserAccount";
import { useDeposit } from "@/hooks/useDeposit";
import { useWithdraw } from "@/hooks/useWithdraw";
import { useInitUser } from "@/hooks/useInitUser";

export const DepositWithdraw: FC = () => {
  const { connected } = useWallet();
  const userAccount = useUserAccount();
  const { deposit, loading: depositLoading, error: depositError } = useDeposit();
  const { withdraw, loading: withdrawLoading, error: withdrawError } = useWithdraw();
  const { initUser, loading: initLoading, error: initError } = useInitUser();

  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [lastSig, setLastSig] = useState<string | null>(null);

  if (!connected) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center shadow-sm">
        <p className="text-gray-500">Connect your wallet</p>
      </div>
    );
  }

  // No account - show init button
  if (!userAccount) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
          Create Account
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          You need an account to trade. This costs a small fee.
        </p>
        <button
          onClick={async () => {
            try {
              const sig = await initUser();
              setLastSig(sig ?? null);
            } catch {
              // error set by hook
            }
          }}
          disabled={initLoading}
          className="w-full rounded-lg bg-[#06d6a0] text-gray-950 py-3 text-sm font-medium transition-colors hover:bg-[#04b886] disabled:opacity-50"
        >
          {initLoading ? "Creating..." : "Create Account"}
        </button>
        {initError && (
          <p className="mt-2 text-xs text-red-600">{initError}</p>
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
  }

  const loading = mode === "deposit" ? depositLoading : withdrawLoading;
  const error = mode === "deposit" ? depositError : withdrawError;

  async function handleSubmit() {
    if (!amount || !userAccount) return;

    try {
      const amtBigint = BigInt(amount);
      let sig: string | undefined;

      if (mode === "deposit") {
        sig = await deposit({ userIdx: userAccount.idx, amount: amtBigint });
      } else {
        sig = await withdraw({ userIdx: userAccount.idx, amount: amtBigint });
      }

      setLastSig(sig ?? null);
      setAmount("");
    } catch {
      // error set by hook
    }
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
        Deposit / Withdraw
      </h3>

      {/* Mode toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMode("deposit")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "deposit"
              ? "bg-[#06d6a0] text-gray-950"
              : "bg-gray-800 text-gray-500 hover:bg-gray-700"
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setMode("withdraw")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "withdraw"
              ? "bg-amber-600 text-white"
              : "bg-gray-800 text-gray-500 hover:bg-gray-700"
          }`}
        >
          Withdraw
        </button>
      </div>

      {/* Amount input */}
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-500">
          Amount (native PERC units)
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000000"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-[#06d6a0] focus:outline-none focus:ring-1 focus:ring-[#06d6a0]"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || !amount}
        className="w-full rounded-lg bg-[#06d6a0] text-gray-950 py-3 text-sm font-medium transition-colors hover:bg-[#04b886] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Sending..."
          : mode === "deposit"
            ? "Deposit PERC"
            : "Withdraw PERC"}
      </button>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

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
