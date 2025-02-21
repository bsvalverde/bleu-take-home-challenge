import {
  BleuNFTAbi,
  BleuStakingContractAbi,
} from "@bleu-builders/tech-challenge-abis";
import { createConfig, mergeAbis } from "ponder";
import { erc721Abi, http } from "viem";
import { getContractAddress } from "./utils/getContractAddress";

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
      abi: mergeAbis([erc721Abi, BleuNFTAbi]),
      address: getContractAddress("BleuNFT"),
    },
    BleuStakingContract: {
      network: "anvil",
      abi: BleuStakingContractAbi,
      address: getContractAddress("BleuStakingContract"),
    },
  },
});
