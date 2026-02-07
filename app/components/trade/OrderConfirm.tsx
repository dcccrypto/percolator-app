"use client";

import { FC } from "react";

interface OrderConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  direction: "long" | "short";
  size: string;
  loading: boolean;
}

export const OrderConfirm: FC<OrderConfirmProps> = ({
  open,
  onClose,
  onConfirm,
  direction,
  size,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-gray-800 bg-[#111318] p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-medium text-white">
          Confirm {direction === "long" ? "Long" : "Short"} Order
        </h3>
        <div className="mb-6 space-y-2 text-sm text-gray-400">
          <p>
            Direction:{" "}
            <span
              className={
                direction === "long" ? "text-emerald-600" : "text-red-600"
              }
            >
              {direction.toUpperCase()}
            </span>
          </p>
          <p>
            Size: <span className="text-white">{size}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-300 py-2 text-sm text-gray-400 transition-colors hover:bg-[#0a0b0f]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
