# Bleu NFT Staking Contract

This directory contains the smart contract implementation for the Bleu NFT staking challenge. The contract allows users to mint NFTs and stake/unstake them. Attestations are granted when 5 different NFTs are staked by the same user.

## Key Features

- ERC721 NFT implementation (`BleuNFT`) with minting functionality
- Staking/Unstaking capabilities through a new custom contract (`BleuStakingContract`)
- Event emissions for tracking state changes

## Contract Architecture

The main contract `BleuNFT` inherits from OpenZeppelin's ERC721 and implements:

- `mint()`: Allows users to mint new NFTs

The staking contract `BleuStakingContract` implements:

- `stake()`: Enables NFT staking
- `unstake()`: Allows withdrawal of staked NFTs

The attestation contract `BleuAttestationContract implements:

- `attest()`: Grants an attestation

## Development Tools

This project uses Foundry for development and testing:

- **Forge**: Testing framework
- **Cast**: Contract interaction tool
- **Anvil**: Local Ethereum node
- **Chisel**: Solidity REPL

## Getting Started

1. Install Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Install dependencies:

```bash
forge install
```

3. Build the contracts:

```bash
forge build
```

4. Run tests:

```bash
forge test
```

## Deployment

To deploy to a testnet (e.g., Sepolia):

```bash
forge script script/BleuNFT.s.sol:BleuNFTScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

## Contract Verification

After deployment, verify your contract:

```bash
forge verify-contract <deployed-address> src/BleuNFT.sol:BleuNFT --chain sepolia
```

## Testing

Run the test suite:

```bash
forge test
```

Generate gas snapshots:

```bash
forge snapshot
```

## Local Development

Start a local node:

```bash
anvil
```

Use one of the provided private keys to deploy the contracts:
```bash
forge script script/BleuNFT.s.sol:BleuNFTScript --rpc-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
```

## Contract Interaction

Use Cast to interact with deployed contracts:

```bash
# Mint an NFT
cast send --rpc-url <rpc_url> --private-key <private_key> <contract_address> "mint()"

# Stake an NFT
cast send --rpc-url <rpc_url> --private-key <private_key> <contract_address> "stake(uint256)" <token_id>
```

## Additional Resources

- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
