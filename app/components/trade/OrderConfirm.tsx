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
      <div className="w-full max-w-sm rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-medium text-gray-100">
          Confirm {direction === "long" ? "Long" : "Short"} Order
        </h3>
        <div className="mb-6 space-y-2 text-sm text-gray-500">
          <p>
            Direction:{" "}
            <span
              className={
                direction === "long" ? "text-[#06d6a0]" : "text-red-600"
              }
            >
              {direction.toUpperCase()}
            </span>
          </p>
          <p>
            Size: <span className="text-gray-100">{size}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-700 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-lg bg-[#06d6a0] py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-[#04b886] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
