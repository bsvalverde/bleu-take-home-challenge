"use client";

import { userContext } from "@/contexts/user-context";
import { NFTList } from "@/types/bleu";
import { getQueryKeyForUserNFTList } from "@/utils/queryKeys";
import {
  BleuNFTAbi,
  Contracts,
  getContractAddress,
} from "@bleu-builders/tech-challenge-contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { LoadingButton } from "../ui/loading-button";

export function BleuMinter() {
  const { userAddress } = useContext(userContext);

  const newIdRef = useRef(0);

  const queryClient = useQueryClient();

  const {
    data: transactionHash,
    isPending,
    writeContractAsync,
  } = useWriteContract();
  const { data: transactionReceipt, isFetching } = useWaitForTransactionReceipt(
    {
      hash: transactionHash,
      query: {
        enabled: Boolean(transactionHash),
      },
    }
  );

  useEffect(() => {
    if (transactionReceipt?.status === "success") {
      const queryKey = getQueryKeyForUserNFTList(userAddress);
      const previousNFTs: NFTList = queryClient.getQueryData(queryKey)!;
      queryClient.setQueryData(queryKey, {
        nfts: {
          items: [
            ...previousNFTs.nfts.items,
            {
              id: newIdRef.current,
              owner: userAddress,
              staked: false,
              stakedAt: null,
            },
          ],
        },
      });
      queryClient.invalidateQueries({ queryKey });
    }
  }, [transactionReceipt]);

  const mint = async () => {
    newIdRef.current = new Date().getTime();
    writeContractAsync({
      address: getContractAddress(Contracts.BleuNFT),
      abi: BleuNFTAbi,
      functionName: "mint",
      args: [userAddress, BigInt(newIdRef.current)],
    });
  };

  return (
    <LoadingButton onClick={mint} loading={isPending || isFetching}>
      Mint
    </LoadingButton>
  );
}
