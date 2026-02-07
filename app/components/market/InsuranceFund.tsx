"use client";

import { FC } from "react";
import { useEngineState } from "@/hooks/useEngineState";
import { formatTokenAmount } from "@/lib/format";

export const InsuranceFund: FC = () => {
  const { insuranceFund, loading } = useEngineState();

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-8 text-center shadow-sm">
        <p className="text-gray-500">Loading insurance fund...</p>
      </div>
    );
  }

  if (!insuranceFund) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-8 text-center shadow-sm">
        <p className="text-gray-500">Market not loaded</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#06d6a0]/30 bg-gradient-to-br from-gray-900 to-[#06d6a0]/10 p-8 shadow-sm">
      <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-[#06d6a0]">
        Insurance Fund (Locked Forever)
      </h2>
      <p className="text-4xl font-bold text-gray-100">
        {formatTokenAmount(insuranceFund.balance)} PERC
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Fee Revenue: {formatTokenAmount(insuranceFund.feeRevenue)} PERC
      </p>
    </div>
  );
};
