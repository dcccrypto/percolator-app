"use client";

import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
        <p>
          🐍 Viper &mdash; Permissionless perpetual futures on Solana.{" "}
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
