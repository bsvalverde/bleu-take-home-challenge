"use client";

import {
  BleuNFTAbi,
  getContractAddress,
} from "@bleu-builders/tech-challenge-contracts";
import { useConnectorClient, useWriteContract } from "wagmi";
import { LoadingButton } from "../ui/loading-button";

export function BleuMinter() {
  const { data: hash, isPending, writeContract } = useWriteContract();

  const { data } = useConnectorClient();

  const mint = async () =>
    writeContract({
      address: getContractAddress("BleuNFT"),
      abi: BleuNFTAbi,
      functionName: "mint",
      args: [data!.account.address, BigInt(2)],
    });

  return (
    <LoadingButton onClick={mint} loading={isPending}>
      Mint
    </LoadingButton>
  );
}
