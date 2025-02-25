"use client";

import { userContext } from "@/contexts/user-context";
import { getUserNFTs } from "@/lib/bleu";
import { getQueryKeyForUserNFTList } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { LoadingPage } from "../loading-page";
import { NFTListItem } from "./nft-list-item";

export function NFTList() {
  const { userAddress } = useContext(userContext);

  const { data: list, isLoading } = useQuery({
    queryKey: getQueryKeyForUserNFTList(userAddress),
    queryFn: () => getUserNFTs(userAddress!),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!list) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>You don't currently own any NFTs</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ul className="flex gap-2 flex-wrap">
        {list.nfts.items.map((nft) => (
          <NFTListItem key={nft.id} nft={nft} />
        ))}
      </ul>
    </div>
  );
}
