import { userContext } from "@/contexts/user-context";
import { NFTList } from "@/types/bleu";
import { NFT } from "@/types/nft";
import {
  getQueryKeyForGlobalStats,
  getQueryKeyForUserNFTList,
} from "@/utils/queryKeys";
import {
  BleuNFTAbi,
  BleuStakingContractAbi,
  Contracts,
  getContractAddress,
} from "@bleu-builders/tech-challenge-contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { LoadingButton } from "../ui/loading-button";

interface Props {
  nft: NFT;
}

export function NFTListItem({ nft }: Props) {
  const { id, staked, stakedAt } = nft;

  const { userAddress } = useContext(userContext);

  const [isLoading, setIsLoading] = useState(false);

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
            items: previousNFTs.nfts.items.map((item) => {
              if (nft.id !== item.id) {
                return item;
              }
              return {
                ...item,
                staked: !item.staked,
                stakedAt: item.staked ? null : new Date(),
              };
            }),
          },
        });
        queryClient.invalidateQueries({ queryKey });
        queryClient.invalidateQueries({
          queryKey: getQueryKeyForGlobalStats(),
        });
        setIsLoading(false);
        toast.success(
          `Succesfully ${staked ? "unstaked" : "staked"} NFT #${nft.id}`
        );
      }
    }, 1000);
  }, [isTransactionSuccessful]);

  const toggleStake = async () => {
    try {
      setIsLoading(true);
      if (!staked) {
        await writeContractAsync({
          address: getContractAddress(Contracts.BleuNFT),
          abi: BleuNFTAbi,
          functionName: "approve",
          args: [
            getContractAddress(Contracts.BleuStakingContract),
            BigInt(nft.id),
          ],
        });
      }
      await writeContractAsync({
        address: getContractAddress(Contracts.BleuStakingContract),
        abi: BleuStakingContractAbi,
        functionName: staked ? "unstake" : "stake",
        args: [BigInt(nft.id)],
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error(`Unable to ${staked ? "unstake" : "stake"} NFT #${nft.id}`);
    }
  };

  return (
    <li className="border-primary rounded-md border p-2 flex flex-col items-start gap-2 w-full md:w-[calc(33%-5px)] lg:w-[calc(25%-6px)] xl:w-[calc(20%-8px)] 2xl:w-[calc(16%)]">
      <p className="font-medium">#{id}</p>
      <LoadingButton
        loading={isLoading}
        variant={staked ? "outline" : "default"}
        onClick={toggleStake}
      >
        {staked ? "Unstake" : "Stake"}
      </LoadingButton>
    </li>
  );
}
