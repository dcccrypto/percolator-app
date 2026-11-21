# percolator-app

A Next.js trading frontend, a TypeScript core library and a CLI for Percolator perpetual futures markets on Solana. Percolator is the risk engine designed by Anatoly Yakovenko ([aeyakovenko/percolator](https://github.com/aeyakovenko/percolator)).

This is an early prototype and has not been audited. Do not use it with real funds. The maintained product frontend lives in [percolator-launch](https://github.com/dcccrypto/percolator-launch).

## Layout

```
app/            @percolator/app   Next.js frontend (pages: /, /trade, /dashboard)
packages/core/  @percolator/core  Slab parsing, instruction encoding, PDA derivation, validation
packages/cli/   @percolator/cli   Command-line tool
src/, scripts/                    Older standalone CLI sources and helper scripts
docs/audit/                       Audit notes
```

## Build and run

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm build          # builds all workspace packages
pnpm dev:app        # frontend on http://localhost:3000
pnpm dev:cli        # build and run the CLI
pnpm test           # @percolator/core tests
```

Program IDs are not hardcoded in this repo. The frontend reads `NEXT_PUBLIC_PROGRAM_ID` (see `app/lib/config.ts`); set it to the wrapper program you want to talk to.

## Related repositories

- [percolator](https://github.com/aeyakovenko/percolator): risk engine (Rust)
- [percolator-prog](https://github.com/aeyakovenko/percolator-prog): on-chain program
- [percolator-match](https://github.com/aeyakovenko/percolator-match): passive LP matcher program

## License

Apache 2.0, see [LICENSE](LICENSE).
