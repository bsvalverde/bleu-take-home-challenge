import {
  BleuNFTAbi,
  BleuStakingContractAbi,
  getContractAddress,
} from "@bleu-builders/tech-challenge-contracts";
import { createConfig } from "ponder";
import { http } from "viem";

export default createConfig({
  networks: {
    anvil: {
      chainId: 31337,
      transport: http("http://localhost:8545"),
      disableCache: true,
    },
  },
  contracts: {
    BleuNFT: {
      network: "anvil",
      abi: BleuNFTAbi,
      address: getContractAddress("BleuNFT"),
    },
    BleuStakingContract: {
      network: "anvil",
      abi: BleuStakingContractAbi,
      address: getContractAddress("BleuStakingContract"),
    },
  },
});
