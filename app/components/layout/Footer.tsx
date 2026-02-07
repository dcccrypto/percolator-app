"use client";

import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0e14] py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
        <p>
          Percolator SOV &mdash; Store of Value on Solana. Trading fees locked
          forever. Supply only goes down.{" "}
          <a
            href="https://github.com/dcccrypto/percolator-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#06d6a0]/70 hover:text-[#06d6a0]"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};
