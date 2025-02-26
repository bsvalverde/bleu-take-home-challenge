# Ponder Indexer

Indexer is a ponder-based event indexer that stores information in a database and exposes that information through a GraphQL API.

## Key Features

- Endpoints for querying all minted NFTs
- Endpoints for querying all staking/unstaking events
- Endpoints for querying addresses that own NFTs
- Parameters for filtering, sorting and paginating all endpoints

## Tech Stack

- Frameworks
  - [Ponder](https://ponder.sh/)

## Execution

1. Make sure the contracts app is already running and the Bleu contracts have been deployed.

2. Navigate to the app directory:
```bash
cd apps/indexer
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

Once the app is running, you can access its GraphiQL interface at `http://localhost:42069/graphql`
