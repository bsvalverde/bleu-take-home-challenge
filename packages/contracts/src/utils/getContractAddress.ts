import { getAddress } from "viem";
import BleuDeploy from "../../../../apps/contracts/broadcast/BleuNFT.s.sol/31337/run-latest.json";

export function getContractAddress(name: string) {
  const transaction = BleuDeploy.transactions.find(
    ({ transactionType, contractName }) =>
      transactionType === "CREATE" && contractName === name
  );
  if (!transaction) {
    throw `${name} was not created`;
  }
  return getAddress(transaction.contractAddress);
}
