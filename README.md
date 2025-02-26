# Bleu NFT Staking + Indexer Challenge

This monorepo contains a full-stack dapp implementation for NFT staking with event indexing.

## Project Structure

```
├── apps/
│   ├── contracts/      # Solidity smart contracts
│   ├── web/            # Next.js frontend
│   └── indexer/        # Ponder indexer
```

## Key Features

- **Smart Contract**: ERC721 NFT and a contract with staking capabilities
- **Frontend**: Next.js app with wallet integration
- **Indexer**: Ponder-based event indexing with GraphQL API

## Getting Started

### Prerequisites

- Node.js 20.9+ (with corepack enabled)

### Quick Start

```bash
# Enable corepack (if not already enabled)
corepack enable

# Enable pnpm (one-time setup)
corepack prepare pnpm@10.2.1 --activate

# Install dependencies
pnpm install
```

See individual app READMEs for specific running instructions.

### Smart Contracts

The Foundry project:

- Has a ERC721 NFT contract with a minting function
- Has a Staking contract for staking and unstaking the implemented NFT

See [apps/contracts/README.md](apps/contracts/README.md) for smart contracts-specific documentation.

## Frontend

The Next.js frontend features:

- Wallet connection (via ConnectKit)
- NFT minting interface
- Staking management
- Real-time updates via GraphQL

See [apps/web/README.md](apps/web/README.md) for frontend-specific documentation.

## Indexer

The Ponder indexer:

- Indexes NFT staking events
- Provides GraphQL API for querying NFT states
- Supports filtering and pagination

See [apps/indexer/README.md](apps/indexer/README.md) for indexer-specific documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
