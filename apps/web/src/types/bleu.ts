import { NFT } from "./nft";

export interface NFTList {
  nfts: {
    items: NFT[];
  };
}

export interface GetGlobalStatsResponse {
  data: {
    staked: {
      totalCount: number;
    };
    unstaked: {
      totalCount: number;
    };
    owners: {
      items: { id: string; nftsStaked: number }[];
    };
  };
}

export interface GetUserNFTResponse {
  data: NFTList;
}
