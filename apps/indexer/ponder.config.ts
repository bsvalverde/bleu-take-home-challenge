import { createConfig } from "ponder";
import { getAddress, http } from "viem";
import BleuDeploy from "../contracts/broadcast/BleuNFT.s.sol/31337/run-latest.json";
import { BleuNFTAbi } from "./abis/BleuNFT";
import { BleuStakingContractAbi } from "./abis/BleuStakingContract";
import { getContractAddress } from "./utils/getContractAddress";

const BleuNFTAddress = getAddress(BleuDeploy.transactions[0]!.contractAddress);
const BleuStakingContractAddress = getAddress(
  BleuDeploy.transactions[2]!.contractAddress
);

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
