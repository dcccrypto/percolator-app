# 🐍 Viper

**Permissionless Perpetual Futures on Solana**

Launch a perpetual futures market for any Solana token in minutes. No permission needed.

Built on the [Percolator](https://github.com/aeyakovenko/percolator) perpetuals engine.

## Features

- **Launch a Market** — Deploy a perp market for any SPL token. Set oracle, seed LP, go live.
- **Trade with Leverage** — Up to 10x leverage. On-chain order matching. Real-time funding rates.
- **Earn as LP** — Provide liquidity, earn trading fees. Passive or vAMM strategies.

## Project Structure

```
packages/core/    @viper/core    — Shared slab parsing, ABI encoding, PDA derivation, validation
packages/cli/     @viper/cli     — CLI tool (32 commands)
app/              @viper/app     — Next.js frontend with Solana wallet adapter
scripts/                         — Deployment, crank bot, admin tools
```

## Installation

```bash
pnpm install
pnpm build
```

## Development

```bash
# Start the frontend
pnpm dev:app

# Run CLI
pnpm dev:cli
```

## Testing

```bash
pnpm test
```

## Related Repositories

- [percolator](https://github.com/aeyakovenko/percolator) — Risk engine library
- [percolator-prog](https://github.com/aeyakovenko/percolator-prog) — Percolator program (Solana smart contract)
- [percolator-match](https://github.com/aeyakovenko/percolator-match) — Passive LP matcher program

## Disclaimer

**FOR EDUCATIONAL PURPOSES ONLY**

This code has **NOT been audited**. Do NOT use in production or with real funds. Use at your own risk.

## License

Apache 2.0 — see [LICENSE](LICENSE)
