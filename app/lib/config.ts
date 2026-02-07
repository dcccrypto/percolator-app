export const config = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL ?? "https://api.mainnet-beta.solana.com",
  programId: process.env.NEXT_PUBLIC_PROGRAM_ID ?? "",
  slabAddress: process.env.NEXT_PUBLIC_SLAB_ADDRESS ?? "",
  collateralMint: process.env.NEXT_PUBLIC_COLLATERAL_MINT ?? "",
} as const;
