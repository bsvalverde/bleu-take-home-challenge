"use client";

import { userContext } from "@/contexts/user-context";
import { getQueryKeyForUserNFTList } from "@/utils/queryKeys";
import {
  BleuNFTAbi,
  Contracts,
  getContractAddress,
} from "@bleu-builders/tech-challenge-contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useWriteContract } from "wagmi";
import { LoadingButton } from "../ui/loading-button";

export function BleuMinter() {
  const { userAddress } = useContext(userContext);

  const { isPending, writeContract } = useWriteContract();

  const queryClient = useQueryClient();

  const mint = async () => {
    writeContract({
      address: getContractAddress(Contracts.BleuNFT),
      abi: BleuNFTAbi,
      functionName: "mint",
      args: [userAddress, BigInt(new Date().getTime())],
    });
    // TODO fix loading feedback and toast error/success
    queryClient.invalidateQueries({
      queryKey: getQueryKeyForUserNFTList(userAddress),
    });
  };

  return (
    <LoadingButton onClick={mint} loading={isPending}>
      Mint
    </LoadingButton>
  );
}
