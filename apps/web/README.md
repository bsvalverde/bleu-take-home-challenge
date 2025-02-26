# Bleu Staking Frontend

Web is the Next.js app that allows users to interact with the implemented smart contracts and fetch information from the indexer.

## Key Features

- Global Stats page that shows number of staked and unstaked NFTs, as well as the list of the top staking addresses
- Interface for connecting your wallet
- Interface for minting new BleuNFTs to you address
- Interface for staking and unstaking your BleuNFTs

## Tech Stack

- Frameworks
  - [React](https://react.dev/)
  - [Next.js](https://nextjs.org/)
- UI & Component Libraries
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Tailwind](https://tailwindcss.com/)
- Blockchain Connection Libraries
  - [ConnectKit](https://docs.family.co/connectkit)
  - [Wagmi](https://wagmi.sh/)

## Configuration

Web needs the following environment variable:

- `INDEXER_URL`: The base URL for the ponder indexer. If using the local default, this should be `http://localhost:42069`

## Execution

1. Make sure both the contracts and the indexer app are already running.

2. Navigate to the app directory:
```bash
cd apps/web
```

3. Install the dependencies (this only needs to be done once for the whole turbo monorepo):
```bash
pnpm install
```

4. Run the app locally
```bash
pnpm run dev
```

## Usage

Once the app is running, you can access it at `http://localhost:3000`
