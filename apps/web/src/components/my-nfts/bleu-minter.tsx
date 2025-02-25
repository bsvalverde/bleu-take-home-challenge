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
import { useContext, useEffect, useRef, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { LoadingButton } from "../ui/loading-button";

export function BleuMinter() {
  const { userAddress } = useContext(userContext);

  const [isLoading, setIsLoading] = useState(false);
  const newIdRef = useRef(0);

  const queryClient = useQueryClient();

  const { data: transactionHash, writeContractAsync } = useWriteContract();
  const { isSuccess: isTransactionSuccessful } = useWaitForTransactionReceipt({
    hash: transactionHash,
    query: {
      enabled: Boolean(transactionHash),
      refetchOnWindowFocus: false,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (isTransactionSuccessful) {
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
        setIsLoading(false);
      }
    }, 1000);
  }, [isTransactionSuccessful]);

  const mint = async () => {
    try {
      setIsLoading(true);
      newIdRef.current = new Date().getTime();
      await writeContractAsync({
        address: getContractAddress(Contracts.BleuNFT),
        abi: BleuNFTAbi,
        functionName: "mint",
        args: [userAddress, BigInt(newIdRef.current)],
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // todo toast error
    }
  };

  return (
    <LoadingButton onClick={mint} loading={isLoading}>
      Mint new NFT
    </LoadingButton>
  );
}
