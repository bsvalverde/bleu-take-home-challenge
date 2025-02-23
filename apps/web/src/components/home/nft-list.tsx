"use client";

import { userContext } from "@/contexts/user-context";
import { getUserNFTs } from "@/lib/bleu";
import { getQueryKeyForUserNFTList } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { NFTListItem } from "./nft-list-item";

export function NFTList() {
  const { userAddress } = useContext(userContext);

  const { data: list, isLoading } = useQuery({
    queryKey: getQueryKeyForUserNFTList(userAddress),
    queryFn: () => getUserNFTs(userAddress!),
  });

  if (isLoading) {
    return <p>loading</p>;
  }

  if (!list) {
    return <p>nothing to show</p>;
  }

  return (
    <ul>
      {list.nfts.items.map((nft) => (
        <NFTListItem key={nft.id} nft={nft} />
      ))}
    </ul>
  );
}
