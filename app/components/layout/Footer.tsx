"use client";

import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-400">
        <p>
          Percolator SOV &mdash; Store of Value on Solana. Trading fees locked forever.{" "}
          <a
            href="https://github.com/dcccrypto/percolator-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};
