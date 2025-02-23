import { NFT } from "./nft";

export interface NFTList {
  nfts: {
    items: NFT[];
  };
}

export interface GetUserNFTResponse {
  data: NFTList;
}
