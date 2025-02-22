import { NFT } from "./nft";

export interface GetUserNFTResponse {
  data: {
    nfts: {
      items: NFT[];
    };
  };
}
