import { userContext } from "@/contexts/user-context";
import { NFTList } from "@/types/bleu";
import { NFT } from "@/types/nft";
import { getQueryKeyForUserNFTList } from "@/utils/queryKeys";
import {
  BleuNFTAbi,
  BleuStakingContractAbi,
  Contracts,
  getContractAddress,
} from "@bleu-builders/tech-challenge-contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { useWriteContract } from "wagmi";
import { LoadingButton } from "../ui/loading-button";

interface Props {
  nft: NFT;
}

export function NFTListItem({ nft }: Props) {
  const { id, staked, stakedAt } = nft;

  const { userAddress } = useContext(userContext);

  const queryClient = useQueryClient();

  const { isPending, writeContractAsync } = useWriteContract();

  // TODO fix feedback
  // isPending ends before contract is succesfull

  const optimisticUpdate = useCallback(() => {
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
  }, []);

  const toggleStake = async () => {
    try {
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
      optimisticUpdate();
    } catch (error) {
      console.error(error);
      // todo toast error and maybe success
    }
  };

  return (
    <li>
      <p>id: {id}</p>
      <LoadingButton
        loading={isPending}
        variant={staked ? "outline" : "default"}
        onClick={toggleStake}
      >
        {staked ? "Unstake" : "Stake"}
      </LoadingButton>
    </li>
  );
}
